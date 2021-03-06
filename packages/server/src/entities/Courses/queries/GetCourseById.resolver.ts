import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { Course } from '../Course.entity';

@Resolver(() => Course)
export class GetCourseByIdResolver {
  @Query(() => Course, {
    nullable: true,
    description: 'Gets a course by its Stream ID',
    name: 'getCourseById',
  })
  async getCourseById(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('courseId') courseId: string,
  ): Promise<Course | null | undefined> {
    const record = await ceramicClient.ceramic.loadStream(courseId);
    if (!record) {
      return null;
    }
    return {
      id: courseId,
      ...record.state.content,
      quests: record.state.next?.content.quests,
    };
  }
}
