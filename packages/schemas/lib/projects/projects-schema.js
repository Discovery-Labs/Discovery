exports.ProjectsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Projects',
  type: 'array',
  title: 'projects',
  items: {
    type: 'object',
    title: 'ProjectItem',
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
}