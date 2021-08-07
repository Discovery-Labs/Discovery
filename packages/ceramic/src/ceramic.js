import CeramicClient from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { fromString, toString } from 'uint8arrays'
import { randomBytes } from '@stablelib/random'
import { schemas } from '@discovery-decrypted/schemas/lib/schemas.js';

export async function makeCeramicClient(config) {
  // The seed must be provided as an environment variable
  if (!process.env.CERAMIC_SEED){
    process.env.CERAMIC_SEED = toString(randomBytes(32), 'base16');
  }
  // Connect to the local Ceramic node
  const ceramic = new CeramicClient.default(config)
  // Authenticate the Ceramic instance with the provider
  const keyDidResolver = KeyDidResolver.default.getResolver()
  const threeIdResolver = ThreeIdResolver.default.getResolver(ceramic)
  const resolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }
  const did = new DID({
    provider: new Ed25519Provider(fromString(process.env.CERAMIC_SEED, 'base16')),
    resolver: resolverRegistry,
  })
  await did.authenticate()
  await ceramic.setDID(did)

  // Publish all the schemas and create their definitions referenced by an alias
  const aliases = {};
  for (let [schemaName, schema] of Object.entries(schemas.discovery)) {
    const publishedSchema = await publishSchema(ceramic, { content: schema, name: schemaName })
    const createdDefinition = await createDefinition(ceramic, {
      name: schemaName,
      description: `Discovery schema for ${schemaName}`,
      schema: publishedSchema.commitId.toUrl(),
    })
    aliases[schemaName] = createdDefinition.id.toString();
  }

  const idx = new IDX({ ceramic, aliases })
  return { ceramic, idx, aliases };
}

export async function createCeramicDocument(data, family, schema) {
  try {
    const { ceramic } = await makeCeramicClient();
    const doc = await TileDocument.create(ceramic,
      data,
      {
        controllers: [ceramic.did.id],
        family,
      }
    )
    const streamId = doc.id.toString()
    return { streamId, doc }
  } catch (error) {
    console.log({ createCeramicDocumentError: error })
  }
}

export async function readCeramicRecord(alias, DID_OR_CAIP10_ID) {
  try {
    const { idx } = await makeCeramicClient();
    return await idx.get(alias, DID_OR_CAIP10_ID)
  } catch (error) {
    console.log({ readCeramicRecordError: error })
  }
}

export async function getCeramicAlias(alias) {
  try {
    const { idx } = await makeCeramicClient();
    return await idx.get(alias) // uses authenticated DID
  } catch (error) {
    console.log({ getCeramicAliasError: error });
  }
}