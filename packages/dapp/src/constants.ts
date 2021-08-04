import type { AppNetwork } from './sdk'

export const APP_NETWORK: AppNetwork =
  ('local-clay' as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork)

export const PROFILE_URL = 'https://ipfs.3box.io/profile'
