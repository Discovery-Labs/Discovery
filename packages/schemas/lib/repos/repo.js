exports.RepoSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Repo',
  type: 'object',
  properties: {
    id: {
      $ref: "#/definitions/CeramicStreamId"
    },
    repo_url: {
      type: "string"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    files: {
      type: "array",
      items: {
        $ref: "#/definitions/CeramicStreamId"
      }
    },
    authors: {
      type: "array",
      items: {
        $ref: "#/definitions/CeramicStreamId"
      }
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
