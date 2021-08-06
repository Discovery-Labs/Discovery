export const ReposSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Repos',
  type: 'object',
  properties: {
    repos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/CeramicDocId"
          },
          title: {
            type: "string",
            maxLength: 150,
          },
        }
      }
    },
  definitions: {
    CeramicStreamId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}