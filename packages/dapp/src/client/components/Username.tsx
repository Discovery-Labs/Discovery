import { Text } from '@chakra-ui/react'
import React from 'react'


import { useEnvState, useKnownDIDsData } from '../hooks'

export default function Username() {
  const { auth } = useEnvState()
  const knownDids = useKnownDIDsData()
  let text
  switch (auth.state) {
    case 'loading':
      text = 'Loading DID...'
      break
    case 'confirmed':
    case 'local':
      text = auth.id
      break
    default:
      text = 'Login to display DID'
  }

  const currentUser = knownDids && auth.id ? knownDids[auth.id] : null

  const name = currentUser && currentUser.profile && currentUser.profile.name

  return <Text maxW="350px" isTruncated>{name || text}</Text>
}
