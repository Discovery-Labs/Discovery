import { useColorModeValue, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { Card } from '../../components/card/card'
import { CardContent } from '../../components/card/card-content'
import { CardHeader } from '../../components/card/card-header'
import { Property } from '../../components/card/property'

import { useEnvState, useKnownDIDsData } from '../hooks'

export default function DisplayCurrentUserInfos() {
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
  const cryptoAccounts =
    currentUser && currentUser.accounts && currentUser.accounts.length > 0
      ? currentUser.accounts.map(({ address, chainId }) => (
          <Property
            key={address}
            label={
              typeof chainId === 'string'
                ? chainId
                : `Namespace: ${chainId.namespace}
                  Ref: ${chainId.reference}`
            }
            value={address}
          />
        ))
      : ''

  const name = currentUser && currentUser.profile && currentUser.profile.name

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.100', 'inherit')}
      py="12"
      px={{ md: '8' }}
      mb={{ md: '12' }}>
      <Card maxW="3xl" mx="auto">
        {auth.id && (
          <CardHeader
            title="Member Info"
            action={
              <Button variant="outline" minW="20" leftIcon={<HiPencilAlt />}>
                Edit
              </Button>
            }
          />
        )}
        <CardContent>
          {cryptoAccounts}
          <Property label="Name" value={name || text} />
          <Property label="Member since" value="August, 2021" />
          <Property label="Rank" value="Super Shadowy Coder" />
        </CardContent>
      </Card>
    </Box>
  )
}
