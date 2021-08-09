export const ProjectsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Projects',
  type: 'object',
  properties: {
    references: {
      type: 'array',
      items: {
        type: 'string',
        title: 'ProjectItem',
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