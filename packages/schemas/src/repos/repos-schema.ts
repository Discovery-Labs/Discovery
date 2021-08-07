export const ReposSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Repos',
  type: "array",
  items: {
    type: "object",
    title: 'RepoItem',
    properties: {
      id: {
        $ref: "#/definitions/CeramicStreamId"
      },
      title: {
        type: "string",
        maxLength: 150,
      },
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
