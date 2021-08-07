'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
var contributors_schema_1 = require("./contributors/contributors-schema");
var course_schema_1 = require("./courses/course-schema");
var courses_schema_1 = require("./courses/courses-schema");
var learners_schema_1 = require("./learners/learners-schema");
var project_schema_1 = require("./projects/project-schema");
var projects_schema_1 = require("./projects/projects-schema");
var repo_schema_1 = require("./repos/repo-schema");
var repos_schema_1 = require("./repos/repos-schema");
exports.schemas = {
    discovery: {
        courses: courses_schema_1.CoursesSchema,
        course: course_schema_1.CourseSchema,
        contributors: contributors_schema_1.Contributors,
        learners: learners_schema_1.Learners,
        projects: projects_schema_1.ProjectsSchema,
        project: project_schema_1.ProjectSchema,
        repos: repos_schema_1.ReposSchema,
        repo: repo_schema_1.RepoSchema,
    }
};
