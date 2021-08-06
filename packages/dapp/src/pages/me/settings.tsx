
import dynamic from 'next/dynamic'
import Head from 'next/head'

import { VStack } from '@chakra-ui/react'
import PageTransition from '../../components/page-transitions'
import Section from '../../components/section'

import OpenGraphMeta from '../../components/OpenGraphMeta'

const SettingsScreen = dynamic(() => import('../../client/components/SettingsScreen'), {
  ssr: false,
})

export default function SettingsPage() {
  return (
    <PageTransition>
      <Head>
        <title>Settings | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <VStack spacing={8}>
        <Section>
          <SettingsScreen />
        </Section>
      </VStack>
    </PageTransition>
  )
}
