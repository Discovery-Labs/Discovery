import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  SimpleGrid,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { Search2Icon, SettingsIcon } from '@chakra-ui/icons'

import PageTransition from '../components/page-transitions'
import Section from '../components/section'
import { ethers } from 'ethers'
import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import Web3Modal from 'web3modal'

import ContentCard from '../components/content-card'

import NFTStore from '../../abis/NFTStore.json'
import DiscoveryMergeNFT from '../../abis/DiscoveryMergeNFT.json'
import QuestCompleteNFT from '../../abis/QuestCompleteNFT.json'

import { InfoIcon } from '@chakra-ui/icons'
import { Popover } from '../components/Popover'
// import DisplayDID from '../../client/components/DisplayDID'
import { useKnownDIDsData } from '../client/hooks'
import { KnownDIDData } from '../client/env'
import dynamic from 'next/dynamic'

const NFTStoreAddress = '0xe429c3885baa6b5b5ab2b2795467c803a04e6cb4'
const DiscoveryMergeNFTAddress = '0x7bfae155fa6a54f6fc09519652e681c2e1ba54b6'
const QuestCompleteNFTAddress = '0xa75b2928457a78a9beb9e0abd447554d11798a10'
const DisplayDID = dynamic(() => import('../client/components/DisplayDID'), {
  ssr: false,
})
export function getStaticProps() {
  const categories = [
    {
      category: 'polygon',
      id: '1',
      title: 'Course How to Do X',
      description: 'For 1 cup of uncooked quinoa,',
      image: '/abstract.png',
      link: 'https://google.com',
    },
    {
      category: 'polygon',
      id: '2',
      title: 'Course How to Do X',
      description: 'For 2 cup of uncooked quinoa,',
      image: '/abstract.png',
      link: 'https://google.com',
    },
    {
      category: 'polygon',
      id: '3',
      title: 'Course How to Do X',
      description: 'For 3 cup of uncooked quinoa,',
      image: '/abstract.png',
      link: 'https://google.com',
    },
  ]

  return {
    props: {
      categories,
    },
    revalidate: 600,
  }
}

interface Cards {
  categories: [
    {
      category: string
      id: number
      title: string
      description: string
      image: string
      link: string
    }
  ]
}

const Paths = (props: Cards) => {
  const [address, setAddress] = useState()

  const [storeContract, setStoreContract] = useState({})
  const [discoveryMergeNFTContract, setDiscoveryMergeNFTContract] = useState({})
  const [questNFTContract, setQuestNFTContract] = useState({})

  useEffect(() => {
    fetchUser()
  }, [])

  const PROJECTS_POPOVER_TEXT = (
    <span>
      Click on the projects to see more details about it.
      <br /> Also, there are filters to explore projects according to certain titles and
      technologies.
    </span>
  )

  const inputCss = {
    '&:hover': { borderColor: 'initial' },
  }

  const inputGroupCss = {
    margin: '0 !important',
  }

  const handleTitleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }, [])

  async function fetchUser() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // const userAddress = await signer.getAddress()
    // setAddress(userAddress)
    // setEventListeners(provider);
    setContracts(signer)
    // console.log('Account:', userAddress)
  }

  function setContracts(signer: ethers.providers.JsonRpcSigner) {
    // Assign contract
    const storeContract = new ethers.Contract(NFTStoreAddress, NFTStore, signer)
    const discoveryMergeNFTContract = new ethers.Contract(
      DiscoveryMergeNFTAddress,
      DiscoveryMergeNFT,
      signer
    )
    const questNFTContract = new ethers.Contract(QuestCompleteNFTAddress, QuestCompleteNFT, signer)
    setStoreContract(storeContract)
    setDiscoveryMergeNFTContract(discoveryMergeNFTContract)
    setQuestNFTContract(questNFTContract)
  }

  async function getOwner() {
    return storeContract
  }
  return (
    <PageTransition>
      <VStack spacing={8}>
        <Section>
          <VStack>
            <DisplayDID />
            <InputGroup flex={1} css={inputGroupCss}>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input
                css={inputCss}
                type="text"
                onChange={handleTitleInputChange}
                placeholder="Search for project title"
              />
            </InputGroup>
          </VStack>
        </Section>
        <Section>
          <VStack>
            <Heading fontSize="10vw" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
              Paths
            </Heading>
            <Popover
              popoverTextElement={PROJECTS_POPOVER_TEXT}
              buttonContent={<InfoIcon boxSize={5} color="green.400" />}
            />
            <Text
              fontSize={['xl', '2xl']}
              color={useColorModeValue('gray.500', 'gray.200')}
              maxW="lg"
              textAlign="center">
              Discovery paths categories: social entertainment, video, virtual reality, art &
              collectibles
            </Text>
            <Button onClick={getOwner}>Click</Button>
          </VStack>
        </Section>
        <Section>
          <Tabs variant="soft-rounded" colorScheme="blue" align="center" w="100%">
            <TabList display="flex" flexWrap="wrap">
              <Tab
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.500', 'gray.500')}
                _selected={{
                  color: useColorModeValue('gray.100', 'gray.800'),
                  bg: useColorModeValue('gray.900', 'gray.100'),
                }}
                mr={2}
                mt={2}>
                <HStack spacing={1}>
                  <Text>Polygon</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.600', 'gray.500')}
                _selected={{
                  color: 'green.800',
                  bg: 'green.100',
                }}
                mr={2}
                mt={2}>
                <HStack spacing={1}>
                  <Text>Ethereum</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.600', 'gray.500')}
                _selected={{
                  color: 'red.800',
                  bg: 'red.100',
                }}
                mr={2}
                mt={2}>
                <HStack spacing={1}>
                  <Text>The Graph</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue('gray.100', 'gray.800')}
                color={useColorModeValue('gray.600', 'gray.500')}
                _selected={{
                  color: 'blue.800',
                  bg: 'blue.100',
                }}
                mr={2}
                mt={2}>
                <HStack spacing={1}>
                  <Text>Bitcoin</Text>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacing={4} mt={8}>
                  {props.categories
                    .filter((el) => el.category === 'polygon')
                    .map((el) => (
                      <ContentCard
                        key={el.id}
                        name={el.title}
                        description={el.description}
                        image={el.image}
                        link={el.link}
                      />
                    ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>
      </VStack>
    </PageTransition>
  )
}

export default Paths
