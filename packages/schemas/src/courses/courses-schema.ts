export const CoursesSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'CoursesList',
  type: 'object',
  properties: {
    courses: {
      type: 'array',
      title: 'courses',
      items: {
        type: 'object',
        title: 'CourseItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicStreamId',
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
          },
          projects: {
            type: 'array',
            title: 'projects',
            items: {
              type: 'object',
              title: 'ProjectItem',
              properties: {
                id: {
                  $ref: '#/definitions/CeramicStreamId',
                },
                title: {
                  type: 'string',
                  title: 'title',
                  maxLength: 100,
                },
              },
            },
          },
          quests: {
            type: 'array',
            title: 'quests',
            items: {
              type: 'object',
              title: 'QuestItem',
              properties: {
                id: {
                  $ref: '#/definitions/CeramicStreamId',
                },
                title: {
                  type: 'string',
                  title: 'title',
                  maxLength: 100,
                },
              },
            },
          }
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