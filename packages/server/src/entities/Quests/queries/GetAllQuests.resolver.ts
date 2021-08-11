import { Resolver, Query } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { QuestsList } from '../mutations/CreateQuest.resolver';
import { Quest } from '../Quest.entity';

@Resolver(() => [Quest])
export class GetAllQuestsResolver {
  @Query(() => [Quest], {
    nullable: true,
    description: 'Gets all the quests in Discovery',
    name: 'getAllQuests',
  })
  async getAllQuests(
    @UseCeramicClient() ceramicClient: Ceramic,
  ): Promise<Quest[] | null | undefined> {
    const allDiscoveryQuests = await ceramicClient.idx.get<QuestsList>(
      'quests',
    );
    if (allDiscoveryQuests) {
      const mergedQuests = await Promise.all(
        allDiscoveryQuests?.quests.map(async (quest) => {
          const record = await ceramicClient.ceramic.loadStream(quest.id);
          if (!record) {
            return null;
          }
          return {
            id: quest.id,
            title: quest.title,
            ...record.state.content,
          };
        }),
      );
      return mergedQuests;
    }
    return undefined;
  }
}