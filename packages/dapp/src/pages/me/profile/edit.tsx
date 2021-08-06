import dynamic from 'next/dynamic'
import Head from 'next/head'


import { VStack } from '@chakra-ui/react'
import PageTransition from '../../../components/page-transitions'
import Section from '../../../components/section'

import OpenGraphMeta from '../../../components/OpenGraphMeta'

const EditProfileScreen = dynamic(() => import('../../../client/components/EditProfileScreen'), {
  ssr: false,
})

export default function EditProfilePage() {
  return (
    <PageTransition>
      <Head>
        <title>My profile | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <VStack spacing={8}>
        <Section>
          <EditProfileScreen />
        </Section>
      </VStack>{' '}
    </PageTransition>
  )
}
