import dynamic from 'next/dynamic'
import Head from 'next/head'

import { VStack } from '@chakra-ui/react'
import PageTransition from '../../../../components/page-transitions'
import Section from '../../../../components/section'

import OpenGraphMeta from '../../../../components/OpenGraphMeta'

const AddTwitterAccountScreen = dynamic(
  () => import('../../../../client/components/AddTwitterAccountScreen'),
  { ssr: false }
)

export default function AddTwitterAccountPage() {
  return (
    <PageTransition>
      <Head>
        <title>Add Twitter account | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <VStack spacing={8}>
        <Section>
          <AddTwitterAccountScreen />
        </Section>
      </VStack>
    </PageTransition>
  )
}
