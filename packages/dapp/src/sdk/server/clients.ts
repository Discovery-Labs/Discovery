import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { fromString, toString } from 'uint8arrays'
import { randomBytes } from '@stablelib/random'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { schemas } from '@discovery-decrypted/schemas'

import type { AppNetwork } from '../config'
import { Core } from '../core'
import { IDX } from '@ceramicstudio/idx'

export class ServerClient extends Core {
  _ed25519Id: Ed25519Provider

  constructor(network: AppNetwork) {
    super(network)
    if (!process.env.CERAMIC_SEED) {
      process.env.CERAMIC_SEED = toString(randomBytes(32), 'base16')
    }
    this._ed25519Id = new Ed25519Provider(fromString(process.env.CERAMIC_SEED, 'base16'))
    this._idx = new IDX({ ceramic: this._ceramic })
  }

  get didEd25519Provider(): Ed25519Provider {
    return this._ed25519Id
  }

  async authenticate(): Promise<DID> {
    const did = new DID({
      provider: this._ed25519Id,
      resolver: this._resolver,
    })
    await did.authenticate()
    await this.ceramic.setDID(did)
    return did
  }

  async setIDXSchemasAndAliases() {
    // Publish all the schemas and create their definitions referenced by an alias
    const aliases = {} as Record<string, string>
    for (const [schemaName, schema] of Object.entries(schemas.discovery)) {
      const publishedSchema = await publishSchema(this.ceramic, {
        content: schema,
        name: schemaName,
      })
      const createdDefinition = await createDefinition(this.ceramic, {
        name: schemaName,
        description: `Discovery schema for ${schemaName}`,
        schema: publishedSchema.commitId.toUrl(),
      })
      aliases[schemaName] = createdDefinition.id.toString()
    }

    const idx = new IDX({ ceramic: this.ceramic, aliases })
    this._idx = idx
  }
}
