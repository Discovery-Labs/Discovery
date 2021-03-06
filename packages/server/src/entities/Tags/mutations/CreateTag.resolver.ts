import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateTagInput } from '../dto/CreateTag.input';
import { Tag } from '../Tag.entity';

export type TagItem = {
  id: string;
  name: string;
  courseId: string;
  completedBy: string[];
};

export type TagsList = { tags: Array<TagItem> };
@Resolver(() => Tag)
export class CreateTagResolver {
  @Mutation(() => Tag, {
    nullable: true,
    description: 'Create a new Tag in Discovery',
    name: 'createTag',
  })
  async createTag(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('input') tag: CreateTagInput,
  ): Promise<Tag | null | undefined> {
    const createdTag = await createCeramicDocument(ceramicClient, {
      data: tag,
      family: 'tag',
      schema: ceramicClient.schemasCommitId['tag'],
    });
    if (!createdTag) {
      return null;
    }

    const existingTags = await ceramicClient.idx.get<TagsList>('tags');
    const tags = existingTags?.tags ?? [];

    await ceramicClient.idx.set('tags', {
      tags: [
        {
          id: createdTag.doc.id.toUrl(),
          name: tag.name,
        },
        ...tags,
      ],
    });

    return {
      id: createdTag.doc.id.toUrl(),
      ...createdTag.doc.content,
    };
  }
}
