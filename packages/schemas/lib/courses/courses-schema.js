"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesSchema = void 0;
exports.CoursesSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Courses',
    type: 'array',
    items: {
        type: 'object',
        title: 'CourseItem',
        properties: {
            id: {
                $ref: '#/definitions/CeramicStreamId',
            },
            name: {
                type: 'string',
                title: 'name',
                maxLength: 100,
            },
        },
    },
    definitions: {
        CeramicStreamId: {
            type: 'string',
            pattern: '^ceramic://.+(\\\\?version=.+)?',
            maxLength: 150,
        },
    },
};
