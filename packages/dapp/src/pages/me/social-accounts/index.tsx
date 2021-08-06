import dynamic from 'next/dynamic'
import Head from 'next/head'

import { VStack } from '@chakra-ui/react'
import PageTransition from '../../../components/page-transitions'
import Section from '../../../components/section'

import OpenGraphMeta from '../../../components/OpenGraphMeta'

const SocialAccountsScreen = dynamic(
  () => import('../../../client/components/SocialAccountsScreen'),
  { ssr: false }
)

export default function SocialAccountsPage() {
  return (
    <PageTransition>
      <Head>
        <title>My social accounts | Self.ID</title>
        <OpenGraphMeta />
      </Head>

      <VStack spacing={8}>
        <Section>
          <SocialAccountsScreen />
        </Section>
      </VStack>
    </PageTransition>
  )
}
