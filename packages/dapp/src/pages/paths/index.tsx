import React from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import {
  Heading,
  Box,
  Card,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
  Anchor,
} from 'grommet'
import Icons from 'grommet-icons'

import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'

import NFTStore from '../../../abis/NFTStore.json'
import DiscoveryMergeNFT from '../../../abis/DiscoveryMergeNFT.json'
import QuestCompleteNFT from '../../../abis/QuestCompleteNFT.json'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { categories } from '../../constants'
import Navbar from '../../components/Navbar'

const NFTStoreAddress = '0xe429c3885baa6b5b5ab2b2795467c803a04e6cb4'
const DiscoveryMergeNFTAddress = '0x7bfae155fa6a54f6fc09519652e681c2e1ba54b6'
const QuestCompleteNFTAddress = '0xa75b2928457a78a9beb9e0abd447554d11798a10'

export type Category = {
  category: string
  id: string
  title: string
  description: string
  image: string
  link: string
}

export async function getStaticProps() {
  return {
    props: {
      categories,
    },
    revalidate: 600,
  }
}

const Paths = ({ categories }: { categories: Category[] }) => {
  const [address, setAddress] = useState('')
  const [storeContract, setStoreContract] = useState<Contract>()
  const [discoveryMergeNFTContract, setDiscoveryMergeNFTContract] = useState<Contract>()
  const [questNFTContract, setQuestNFTContract] = useState<Contract>()

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const userAddress = await signer.getAddress()
    setAddress(userAddress)
    setEventListeners(provider)
    setContracts(signer)
    console.log('Account:', userAddress)
  }

  function setEventListeners(provider: Web3Provider) {
    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
      console.log(accounts)
    })

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
      console.log(chainId)
    })

    // Subscribe to provider connection
    provider.on('connect', (info) => {
      console.log(info)
    })

    // Subscribe to provider disconnection
    provider.on('disconnect', (error) => {
      console.log(error)
    })
  }

  function setContracts(signer: JsonRpcSigner) {
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
    if (storeContract) {
      await storeContract.console.log('address = ', address)
      return storeContract.address
    }
  }

  return (
    <Layout>
      <Navbar />
      <Box>
        <Text color={useColorModeValue('gray.800', 'gray.600')} textAlign="center">
          Connected with: {address}
        </Text>
        <Heading level={1}>Paths</Heading>
        <Text color={useColorModeValue('gray.500', 'gray.200')} textAlign="center">
          Discovery paths categories: social entertainment, video, virtual reality, art &
          collectibles
        </Text>
        <Button onClick={getOwner}>Click</Button>
      </Box>
      <Box>
        {categories.map((el) => (
          <Card key={el.id} background="light-2" pad="medium">
            <CardHeader pad="medium">{el.category}</CardHeader>
            <CardBody pad="medium">
              <Box height="small" width="small">
                <Image fit="cover" src={el.image} />
              </Box>
              {el.description}
            </CardBody>
            <CardFooter pad={{ horizontal: 'small' }} background="dark2-1">
              <Link href={el.link} passHref>
                <Anchor color="light-4">{el.link}</Anchor>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Layout>
  )
}

export default Paths
