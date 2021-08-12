import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateCourseInput } from '../dto/CreateCourse.input';
import { Course } from '../Course.entity';
import { ProjectsList } from '../../Projects/mutations/CreateProject.resolver';
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
    const allProjects = await ceramicClient.idx.get<ProjectsList>('projects');
    const courses = existingCourses?.courses ?? [];
    const projects = allProjects?.projects ?? [];

    const existingCoursesForProject = projects
      .filter((project) =>
        course.projects.map((pj) => pj.id).includes(project.id),
      )
      .flatMap((proj) => proj.courses);

    const projectIds = course.projects.map((courseProject) => courseProject.id);
    const projectsRelatedToCourse = projects.filter((project) =>
      projectIds.includes(project.id),
    );

    for (const project of projectsRelatedToCourse) {
      const projectDoc = await TileDocument.load(
        ceramicClient.ceramic,
        project.id,
      );
      await projectDoc.update({
        courses: [course, ...(existingCoursesForProject || [])],
      });
      await ceramicClient.idx.merge('projects', {
        id: project.id,
        courses: [course, ...(existingCoursesForProject || [])],
      });
    }

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
