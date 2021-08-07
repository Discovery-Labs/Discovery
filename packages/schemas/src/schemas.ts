'use strict';
import { Contributors }  from './contributors/contributors-schema'
import { CourseSchema } from './courses/course-schema';
import { CoursesSchema } from './courses/courses-schema';
import { Learners } from './learners/learners-schema';
import { ProjectSchema } from './projects/project-schema';
import { ProjectsSchema } from './projects/projects-schema';
import { RepoSchema } from './repos/repo-schema';
import { ReposSchema } from './repos/repos-schema';

export const schemas = {
    discovery: {
        courses: CoursesSchema,
        course: CourseSchema,
        contributors: Contributors,
        learners: Learners,
        projects: ProjectsSchema,
        project: ProjectSchema,
        repos: ReposSchema,
        repo: RepoSchema,
    }
};