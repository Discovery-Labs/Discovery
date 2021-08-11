'use strict';
import { Contributors }  from './contributors/contributors-schema'
import { CourseSchema } from './courses/course-schema';
import { CoursesSchema } from './courses/courses-schema';
import { Learners } from './learners/learners-schema';
import { ProjectSchema } from './projects/project-schema';
import { ProjectsSchema } from './projects/projects-schema';
import { QuestSchema } from './quests/quest-schema';
import { QuestsSchema } from './quests/quests-schema';
import { RepoSchema } from './repos/repo-schema';
import { ReposSchema } from './repos/repos-schema';

export const schemas = {
    discovery: {
        projects: ProjectsSchema,
        project: ProjectSchema,
        courses: CoursesSchema,
        course: CourseSchema,
        quests: QuestsSchema,
        quest: QuestSchema,
        contributors: Contributors,
        learners: Learners,
        repos: ReposSchema,
        repo: RepoSchema,
    }
};