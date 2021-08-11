import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateQuestInput } from '../dto/CreateQuest.input';
import { Quest } from '../Quest.entity';

export type QuestItem = {
  id: string;
  title: string;
};

export type QuestsList = { quests: Array<QuestItem> };
@Resolver(() => Quest)
export class CreateQuestResolver {
  @Mutation(() => Quest, {
    nullable: true,
    description: 'Create a new Quest in Discovery',
    name: 'createQuest',
  })
  async createQuest(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('input') quest: CreateQuestInput,
  ): Promise<Quest | null | undefined> {
    const createdQuest = await createCeramicDocument(ceramicClient, {
      data: quest,
      family: 'quest',
      schema: ceramicClient.schemasCommitId['quest'],
    });
    if (!createdQuest) {
      return null;
    }

    const existingQuests = await ceramicClient.idx.get<QuestsList>('quests');

    const quests = existingQuests?.quests ?? [];
    await ceramicClient.idx.set('quests', {
      quests: [
        {
          id: createdQuest.doc.id.toUrl(),
          title: quest.title,
          courseId: quest.courseId,
        },
        ...quests,
      ],
    });

    const allQuests = await ceramicClient.idx.get<QuestsList>('quests');
    console.log(allQuests);

    return {
      id: createdQuest.doc.id.toUrl(),
      ...createdQuest.doc.content,
    };
  }
}
