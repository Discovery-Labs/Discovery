import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateCourseInput } from '../dto/CreateCourse.input';
import { Course } from '../Course.entity';
import { TileDocument } from '@ceramicnetwork/stream-tile';

export type CourseItem = {
  id: string;
  title: string;
  projects: {
    id: string;
    name: string;
  }[];
};

export type CoursesList = { courses: Array<CourseItem> };
@Resolver(() => Course)
export class CreateCourseResolver {
  @Mutation(() => Course, {
    nullable: true,
    description: 'Create a new Course in Discovery',
    name: 'createCourse',
  })
  async createCourse(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('input') course: CreateCourseInput,
  ): Promise<Course | null | undefined> {
    const createdCourse = await createCeramicDocument(ceramicClient, {
      data: course,
      family: 'course',
      schema: ceramicClient.schemasCommitId['course'],
    });
    if (!createdCourse) {
      return null;
    }

    const existingCourses = await ceramicClient.idx.get<CoursesList>('courses');
    const courses = existingCourses?.courses ?? [];

    await ceramicClient.idx.set('courses', {
      courses: [
        {
          id: createdCourse.doc.id.toUrl(),
          ...createdCourse.doc.content,
        },
        ...courses,
      ],
    });

    const projectToUpdateStreamIds = course.projects.map((p) => p.id);
    for (const projectStreamId of projectToUpdateStreamIds) {
      const projectDoc = await TileDocument.load(
        ceramicClient.ceramic,
        projectStreamId,
      );

      const existingProjectCourses = existingCourses?.courses.filter((c) =>
        c.projects.every((p) => projectToUpdateStreamIds.includes(p.id)),
      );

      await projectDoc.update({
        ...(projectDoc.content as Record<string, any>),
        courses: [
          { id: createdCourse.doc.id.toUrl(), title: course.title },
          ...(existingProjectCourses || []),
        ],
      });
    }

    return {
      id: createdCourse.doc.id.toUrl(),
      ...createdCourse.doc.content,
    };
  }
}
