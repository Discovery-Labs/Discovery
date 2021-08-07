"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learners = void 0;
exports.Learners = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Learners',
    type: 'array',
    items: {
        type: 'object',
        title: 'LearnerItem',
        properties: {
            id: {
                $ref: '#/definitions/CeramicStreamId',
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
