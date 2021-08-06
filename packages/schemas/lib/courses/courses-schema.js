exports.CoursesSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Courses',
  type: 'object',
  properties: {
    projects: {
      type: 'array',
      title: 'courses',
      items: {
        type: 'object',
        title: 'Course',
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
    },
  },
  definitions: {
    CeramicStreamId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}
