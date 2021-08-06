exports.ProjectSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Project',
  type: 'object',
  properties: {
    // "id": {
    //   "$ref": "#/components/schemas/CeramicDocId"
    // },
    name: {
      type: "string"
    },
    whitepaper: {
      type: "string"
    },
    website: {
      type: "string"
    },
    twitter: {
      type: "string"
    },
    discord: {
      type: "string"
    },
    github: {
      type: "string"
    },
    description: {
      type: "string"
    },
    logo: {
      type: "string"
    },
    contract_address: {
      type: "string"
    },
    is_featured: {
      type: "boolean"
    },
    categories: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CeramicDocId"
      }
    },
    repos: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CeramicDocId"
      }
    },
    peerProjects: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CeramicDocId"
      }
    }
  },
}
