export const QuestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Quest',
  description: 'A course covers a specific topic within a project or an ecosystem',
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
          name: {
            type: 'string',
            maxLength: 200
          },
          cid: {
            type: 'string'
          }
        },
        // required: ['name', 'cid']
      }
    },
  },
}