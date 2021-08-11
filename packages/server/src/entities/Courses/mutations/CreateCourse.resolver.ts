import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateCourseInput } from '../dto/CreateCourse.input';
import { Course } from '../Course.entity';

export type CourseItem = {
  id: string;
  title: string;
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
          title: course.title,
          projects: course.projects,
        },
        ...courses,
      ],
    });

    const allCourses = await ceramicClient.idx.get<CoursesList>('courses');
    console.log(allCourses);

    return {
      id: createdCourse.doc.id.toUrl(),
      ...createdCourse.doc.content,
    };
  }
}
