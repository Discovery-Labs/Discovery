/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Card } from '../../components/card/card'
import { CardContent } from '../../components/card/card-content'
import { CardHeader } from '../../components/card/card-header'
import { Property } from '../../components/card/property'

import { useEnvState, useKnownDIDsData } from '../hooks'

export function capitalize([first, ...rest]: string) {
  return first.toUpperCase() + rest.join('').toLowerCase()
}
export default function DisplayCurrentUserInfos({ children }: any) {
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
  console.log(currentUser)
  // const cryptoAccounts =
  //   currentUser && currentUser.accounts && currentUser.accounts.length > 0
  //     ? currentUser.accounts.map(({ address, chainId }) => (
  //         <Property
  //           key={address}
  //           label={
  //             typeof chainId === 'string'
  //               ? chainId
  //               : `Namespace: ${chainId.namespace}
  //                 Ref: ${chainId.reference}`
  //           }
  //           value={address}
  //         />
  //       ))
  //     : ''
  // const socialAccounts =
  //   currentUser && currentUser.socialAccounts && currentUser.socialAccounts.length > 0
  //     ? currentUser.socialAccounts.map(
  //         ({ id, host }) =>
  //           host && (
  //             <Property key={id} label={capitalize(host.split('.').shift() as string)} value={id} />
  //           )
  //       )
  //     : ''

  const name =
    (currentUser && currentUser.profile && currentUser.profile.name) ?? 'Super Shadowy Coder'

  return (
    <VStack spacing={0} w="100%">
      {auth.id ? children : <Text>Login to see your Profile</Text>}
    </VStack>
    // <Box
    //   as="section"
    //   bg={useColorModeValue('gray.100', 'inherit')}
    //   py="12"
    //   px={{ md: '8' }}
    //   mb={{ md: '12' }}>
    //   <Card maxW="3xl" mx="auto">
    //     {auth.id && <CardHeader title="Super Shadowy Coder" />}
    //     <CardContent>
    //       {auth.id && (
    //         <Image
    //           borderRadius="full"
    //           boxSize="150px"
    //           margin="auto"
    //           src="/super-shadowy-coder.png"
    //           alt={name || text}
    //         />
    //       )}
    //       <Property label="Name" value={name || text} />
    //       {socialAccounts}
    //       {cryptoAccounts}
    //       <Property label="Member since" value="August, 2021" />
    //     </CardContent>
    //   </Card>
    // </Box>
  )
}
