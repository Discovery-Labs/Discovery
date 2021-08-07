'use strict';

const { Contributors } = require('./contributors/contributors-schema');
const { CourseSchema } = require('./courses/course-schema');
const { CoursesSchema } = require('./courses/courses-schema');
const { Learners } = require('./learners/learners-schema');
const { ProjectSchema } = require('./projects/project-schema');
const { ProjectsSchema } = require('./projects/projects-schema');
const { RepoSchema } = require('./repos/repo-schema');
const { ReposSchema } = require('./repos/repos-schema');

exports.schemas = {
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