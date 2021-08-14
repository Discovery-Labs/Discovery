import { getLegacy3BoxProfileAsBasicProfile, isCaip10, isDid } from '@ceramicstudio/idx'
import type { AlsoKnownAsAccount, BasicProfile, ImageSources } from '@ceramicstudio/idx-constants'
// import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import PageTransition from '../components/page-transitions'
import Section from '../components/section'

import AvatarPlaceholder from '../components/AvatarPlaceholder'
import { GITHUB_HOST, TWITTER_HOST, getImageSrc } from '../sdk'
import type { Dimensions } from '../sdk'
import countryIcon from '../images/icons/country.png'
import linkIcon from '../images/icons/link.svg'
import locationIcon from '../images/icons/location.png'
import githubIcon from '../images/icons/social-github.svg'
import twitterIcon from '../images/icons/social-twitter.svg'
import { BRAND_COLOR, PLACEHOLDER_COLOR } from '../theme'
import { isEthereumAddress, isSupportedDid } from '../utils'

import { Box, Heading, HStack, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import SocialCard from '../components/social-card'
const ETH_CHAIN_ID = `@eip155:1`

const DisplayDID = dynamic(() => import('../client/components/DisplayDID'), {
  ssr: false,
})

export function getImageURL(
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  return sources ? getImageSrc(sources, dimensions) : '/super-shadowy-coder.png'
}

const ConnectSettingsButton = dynamic(() => import('../client/components/ConnectSettingsButton'), {
  ssr: false,
})

const ConnectEditSocialAccountsButton = dynamic(
  () => import('../client/components/ConnectEditSocialAccountsButton'),
  { ssr: false }
)

type Support =
  | 'invalid' // not a DID or CAIP-10
  | 'legacy' // legacy 3Box profile loaded from Ethereum address
  | 'supported' // did:3 or did:key
  | 'unsupported' // other DID method, not supported by Ceramic node

function canEditProfile(support: Support): boolean {
  return support === 'supported' || support === 'legacy'
}

type Props = {
  id: string | null
  loadedProfile: BasicProfile | null
  socialAccounts: Array<AlsoKnownAsAccount>
  support: Support
}

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
  const id = ctx.params?.id ?? null
  if (id === null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  let loadedProfile = null
  let socialAccounts: Array<AlsoKnownAsAccount> = []
  let support: Support = 'unsupported'

  if (isDid(id)) {
    if (isSupportedDid(id)) {
      // Main case: we expect a DID to be provided
      support = 'supported'
      const { core } = await import('../server')
      const [profile, aka] = await Promise.all([core.getProfile(id), core.getAlsoKnownAs(id)])
      loadedProfile = profile
      socialAccounts = aka?.accounts ?? []
    } else {
      support = 'unsupported'
    }
  } else if (isEthereumAddress(id)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${id}${ETH_CHAIN_ID}`, permanent: true },
    }
  } else if (isCaip10(id)) {
    const { core } = await import('../server')
    try {
      const linkedDid = await core.idx.caip10ToDid(id)
      if (linkedDid != null) {
        // If there is a linked DID, redirect to the DID URL
        // This is a temporary redirect as the CAIP-10 could get linked to another DID
        return {
          redirect: { destination: `/${linkedDid}`, permanent: false },
        }
      }
    } catch (err) {
      // Ignore error trying to get DID from CAIP-10
    }

    if (id.endsWith(ETH_CHAIN_ID)) {
      // Fallback for legacy 3Box profiles
      support = 'legacy'
      const address = id.slice(0, -ETH_CHAIN_ID.length)
      loadedProfile = await getLegacy3BoxProfileAsBasicProfile(address)
    }
  }

  return {
    props: { id, loadedProfile, socialAccounts, support },
  }
}

const Header = styled.div<{ url?: string }>`
  height: 310px;
  background-color: ${PLACEHOLDER_COLOR};
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-position: center;
      background-size: cover;
    `}

  @media(min-width: 1536px) {
    border-radius: 20px;
  }
`

const AvatarContainer = styled.div`
  width: 146px;
  height: 146px;
  background-color: ${PLACEHOLDER_COLOR};
  border: 3px solid white;
  border-radius: 78px;
  margin-top: -78px;
`

const Avatar = styled.div<{ url: string }>`
  width: 146px;
  height: 146px;
  border-radius: 78px;
  background-size: cover;
  ${(props) => css`
    background-image: url(${props.url});
  `}
`

const Name = styled.h1`
  color: ${BRAND_COLOR};
  font-size: 28px;
  font-weight: 500;
`

type NoProfileProps = {
  id: string | null
  support: Support
}

function NoProfile({ id, support }: NoProfileProps) {
  const edit = canEditProfile(support) ? (
    <Box>
      <Box alignSelf="end" margin="medium" width="150px">
        <ConnectSettingsButton did={id} />
      </Box>
    </Box>
  ) : null

  return (
    <PageTransition>
      <Head>
        <title>No profile | self.ID</title>
      </Head>

      <Header />
      <Box alignSelf="center" width="large">
        <Box direction="row">
          <AvatarContainer>
            <AvatarPlaceholder did={id} size={146} />
          </AvatarContainer>
          {edit}
        </Box>
        <Name>No profile</Name>
      </Box>
    </PageTransition>
  )
}

export default function ProfilePage({ id, loadedProfile, socialAccounts, support }: Props) {
  const [profile, setProfile] = useState<BasicProfile | null>(loadedProfile)
  useEffect(() => {
    setProfile(loadedProfile)
  }, [loadedProfile])

  if (id == null || profile == null || !canEditProfile(support)) {
    return <NoProfile id={id} support={support} />
  }

  const name = profile.name ?? 'Super Shadowy Coder'

  const description = profile.description ? <Text>{profile.description}</Text> : null

  const link = profile.url ? (
    <Link href={profile.url} label={profile.url} margin={{ left: 'small' }} target="_blank" />
  ) : null
  const linksContainer = link ? (
    <Box p="8">
      {link}
      <Image alt="Link" src={linkIcon as StaticImageData} />
    </Box>
  ) : null

  const location = profile.homeLocation ? (
    <Box direction="row" margin={{ left: 'medium' }}>
      <Image alt="Home location" src={locationIcon} />
      <Text color="neutral-4" margin={{ left: 'small' }}>
        {profile.homeLocation}
      </Text>
    </Box>
  ) : null
  const country = profile.residenceCountry ? (
    <Box direction="row" margin={{ left: 'medium' }}>
      <Image alt="Residence country" src={countryIcon} />
      <Text color="neutral-4" margin={{ left: 'small' }}>
        {profile.residenceCountry}
      </Text>
    </Box>
  ) : null
  const locationContainer =
    location || country ? (
      <HStack spacing="8">
        {location}
        {country}
      </HStack>
    ) : null

  const socialTitle = profile.name ? `${profile.name} on Self.ID` : 'Self.ID'

  const metaDescription = profile.description ? (
    <>
      <meta name="description" content={profile.description} />
      <meta name="twitter:description" content={profile.description} />
      <meta property="og:description" content={profile.description} />
    </>
  ) : null

  const metaImage = profile.image ? (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={profile.image.original.src} />
      <meta name="twitter:image:alt" content={`Image for ${socialTitle}`} />
      <meta property="og:image" content={profile.image.original.src} />
    </>
  ) : profile.background ? (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={profile.background.original.src} />
      <meta name="twitter:image:alt" content={`Background image for ${socialTitle}`} />
      <meta property="og:image" content={profile.background.original.src} />
    </>
  ) : (
    <meta name="twitter:card" content="summary" />
  )

  const avatarURL = getImageURL(profile.image, { height: 150, width: 150 })
  const avatar = avatarURL ? <Avatar url={avatarURL} /> : <AvatarPlaceholder did={id} size={146} />
  // const avatar = avatarURL ? <Avatar src={avatarURL} /> : <AvatarPlaceholder did={id} size={146} />

  let socialContainer = null
  if (socialAccounts.length) {
    const socialItems = socialAccounts.map((a) => {
      const host = a.host ?? ''
      const image =
        host === GITHUB_HOST ? (
          <Box margin={{ right: 'small' }} justify="center" key={a.id}>
            <Image alt="GitHub" src={githubIcon as StaticImageData} />
          </Box>
        ) : host === TWITTER_HOST ? (
          <Box margin={{ right: 'small' }} justify="center" key={a.id}>
            <Image alt="Twitter" src={twitterIcon as StaticImageData} />
          </Box>
        ) : null
      return (
        <SocialCard key={a.id} name={a.id} image={image} link={`${a.protocol}://${host}/${a.id}`} />
      )
    })
    socialContainer = (
      <VStack w="100%" align="center" py="6">
        <Box d="flex" alignItems="baseline">
          <Heading as="h2" size="xl" px="2">
            Social
          </Heading>
          <ConnectEditSocialAccountsButton did={id} />
        </Box>
        <Box minW={{ base: '440px', md: '500px', lg: '560px' }}>{socialItems}</Box>
      </VStack>
    )
  }

  return (
    <PageTransition>
      <Head>
        <title>{name} | Self.ID</title>
        <meta name="twitter:site" content="@mySelfID" />
        <meta name="twitter:title" content={socialTitle} />
        <meta property="og:title" content={socialTitle} />
        {metaDescription}
        {metaImage}
      </Head>

      <Section>
        <DisplayDID>
          <HStack>
            <Box bg="white" color="gray.900" rounded="full" p={1}>
              {avatar}
            </Box>
            <VStack align="start">
              <Heading
                as="h2"
                size="xl"
                bgGradient={useColorModeValue(
                  'linear(to-l, pink.700, purple.900)',
                  'linear(to-l, pink.200, purple.700)'
                )}
                bgClip="text">
                {name}
                {profile.emoji ? ` ${profile.emoji}` : null}
              </Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.200')}>
                {id}
              </Text>
              <ConnectSettingsButton did={id} />
            </VStack>
          </HStack>
          <Text>{description}</Text>
          {/* <HStack justify="space-between" p="8">
            {linksContainer}
            {locationContainer}
          </HStack> */}
          {socialContainer}
        </DisplayDID>
      </Section>
    </PageTransition>
  )
}
