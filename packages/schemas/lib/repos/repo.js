exports.RepoSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Project',
  type: 'object',
  properties: {
    type: "object",
    properties: {
      id: {
        $ref: "#/components/schemas/CeramicDocId"
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
          $ref: "#/components/schemas/CeramicDocId"
        }
      },
      authors: {
        type: "array",
        items: {
          $ref: "#/components/schemas/CeramicDocId"
        }
      }
    }
  }
}
