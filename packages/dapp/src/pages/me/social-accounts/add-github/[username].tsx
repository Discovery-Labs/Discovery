import dynamic from 'next/dynamic'
import Head from 'next/head'

import { VStack } from '@chakra-ui/react'
import PageTransition from '../../../../components/page-transitions'
import Section from '../../../../components/section'

import OpenGraphMeta from '../../../../components/OpenGraphMeta'

const AddGitHubAccountScreen = dynamic(
  () => import('../../../../client/components/AddGitHubAccountScreen'),
  { ssr: false }
)

export default function AddGitHubAccountPage() {
  return (
    <PageTransition>
      <Head>
        <title>Add GitHub account | Self.ID</title>
        <OpenGraphMeta />
      </Head>

      <VStack spacing={8}>
        <Section>
          <AddGitHubAccountScreen />
        </Section>
      </VStack>
    </PageTransition>
  )
}
