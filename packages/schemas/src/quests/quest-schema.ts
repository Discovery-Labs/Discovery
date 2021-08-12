export const QuestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Quest',
  description: 'A quest is a challenge that certifies the knowledge aquired during a course',
  type: 'object',
  properties: {
    createdAt: {
      type: 'string',
      format: 'date-time',
      maxLength: 30,
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      maxLength: 30,
    },
    nfts: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          rarityTreshold: {
            type: 'integer',
            minimum: 0
          },
          name: {
            type: 'string',
            maxLength: 200
          },
          cid: {
            type: 'string'
          }
        },
      }
    },
  },
}