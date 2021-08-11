export const QuestsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'QuestsList',
  type: 'object',
  properties: {
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
          courseId: {
            $ref: '#/definitions/CeramicStreamId',
          },
          completedBy: {
            type: 'array',
            items: {
              $ref: '#/definitions/CeramicStreamId',
            }
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
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