import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { CourseItem } from '../../Courses/mutations/CreateCourse.resolver';
import { QuestItem } from '../../Quests/mutations/CreateQuest.resolver';
import { Project } from '../Project.entity';

@Resolver(() => Project)
export class GetProjectByIdResolver {
  @Query(() => Project, {
    nullable: true,
    description: 'Gets a project by its Stream ID',
    name: 'getProjectById',
  })
  async getProjectById(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('projectId') projectId: string,
  ): Promise<Project | null | undefined> {
    const record = await ceramicClient.ceramic.loadStream(projectId);
    if (!record) {
      return null;
    }
    const projectCourses = record.state.next?.content.courses;
    if (projectCourses && projectCourses.length > 0) {
      const allCourses = await Promise.all(
        projectCourses.map(async (course: CourseItem) => {
          const fullCourse = await ceramicClient.ceramic.loadStream(course.id);
          const fullCourseQuests = fullCourse.state.next?.content.quests;
          if (!fullCourseQuests) {
            return {
              id: course.id,
              ...fullCourse.state.content,
            };
          }
          const fullQuests = await Promise.all(
            fullCourseQuests.map(async (quest: QuestItem) => {
              const fullQuest = await ceramicClient.ceramic.loadStream(
                quest.id,
              );
              return {
                id: quest.id,
                ...fullQuest.state.content,
              };
            }),
          );
          return {
            id: course.id,
            ...fullCourse.state.content,
            quests: fullQuests,
          };
        }),
      );
      return {
        id: projectId,
        ...record.state.content,
        courses: allCourses,
      };
    }
    return {
      id: projectId,
      ...record.state.content,
    };
  }
}
