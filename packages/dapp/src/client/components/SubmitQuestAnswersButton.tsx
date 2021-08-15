/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { VStack, Text, Button, useToast } from '@chakra-ui/react'
import Web3 from 'web3'

import NFTStore from '../../abis/NFTStore.json'
import DiscoveryMergeNFT from '../../abis/DiscoveryMergeNFT.json'
import QuestCompleteNFT from '../../abis/QuestCompleteNFT.json'
import ChainlinkNFT from '../../abis/ChainlinkNFT.json'
import { SUBMIT_QUEST_ANSWERS_MUTATION } from '../../graphql/quests'
import { useEnvState } from '../hooks'

export function capitalize([first, ...rest]: string) {
  return first.toUpperCase() + rest.join('').toLowerCase()
}
export default function SubmitQuestAnswersButton({
  questId,
  questionAnswers,
  setQuestionAnswer,
}: any) {
  const toast = useToast()
  const [questResult, setQuestResult] = useState(false)
  const [account, setAccount] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [storeContract, setStoreContract] = useState('')
  const [questNFTContract, setQuestNFTContract] = useState('')
  const [discoveryMergeNFTContract, setDiscoveryMergeNFTContract] = useState('')
  const [chainLinkNFTContract, setChainLinkNFTContract] = useState('')
  const [chainlinkAddress, setChainlinkAddress] = useState('')
  // const [completedQuestString, setCompletedQuestString] = useState('')
  const [submitQuestAnswers] = useMutation(SUBMIT_QUEST_ANSWERS_MUTATION)
  const { auth } = useEnvState()
  const did = auth.id

  /******Put in useEffect on initial render? */
  const w = window as any
  const nftStore = NFTStore as any
  const questCompleteStore = QuestCompleteNFT as any
  const discoveryMergeStore = DiscoveryMergeNFT as any
  const chainlinkStore = ChainlinkNFT as any
  const loadWeb3 = async () => {
    if (w.ethereum) {
      w.web3 = new Web3(w.ethereum)
      await w.ethereum.enable()
    } else if (w.web3) {
      w.web3 = new Web3(w.web3.currentProvider)
    } else {
      w.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = w.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    setAccount(accounts[0])
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkNFTStoreData = nftStore.networks[networkId]
    const networkQuestNFTData = questCompleteStore.networks[networkId]
    const networkDiscoveryMergeNFTData = discoveryMergeStore.networks[networkId]
    const networkChainLinkNFTData = chainlinkStore.networks[networkId]

    if (networkNFTStoreData) {
      console.log(
        networkQuestNFTData.address,
        networkDiscoveryMergeNFTData.address,
        networkChainLinkNFTData.address,
        networkNFTStoreData.address
      )
      // Assign contract
      const storeContract = new web3.eth.Contract(NFTStore.abi, networkNFTStoreData.address)
      const questNFTContract = new web3.eth.Contract(
        QuestCompleteNFT.abi,
        networkQuestNFTData.address
      )
      const discoveryMergeNFTContract = new web3.eth.Contract(
        DiscoveryMergeNFT.abi,
        networkDiscoveryMergeNFTData.address
      )
      const chainLinkNFTContract = new web3.eth.Contract(
        ChainlinkNFT.abi,
        networkChainLinkNFTData.address
      )

      console.log('BEFORE ALLOW MINT')
      const allowMint = await chainLinkNFTContract.methods.allowMint().call()
      setStoreContract(storeContract)
      setQuestNFTContract(questNFTContract)
      setDiscoveryMergeNFTContract(discoveryMergeNFTContract)
      setChainLinkNFTContract(chainLinkNFTContract)
      setChainlinkAddress(networkChainLinkNFTData.address)

      // const checkStorage = localStorage.getItem(this.state.account)
      // if (!checkStorage) {
      //   localStorage.setItem(this.state.account, 'NNN')
      // } else {
      //   if (localStorage.getItem(this.state.account)[0] === 'Y') {
      //     this.setState({ quest_1_complete: true })
      //   }
      //   if (localStorage.getItem(this.state.account)[1] === 'Y') {
      //     this.setState({ quest_2_complete: true })
      //   }
      //   if (localStorage.getItem(this.state.account)[2] === 'Y') {
      //     this.setState({ quest_3_complete: true })
      //   }
      // }
      const isAdmin = await storeContract.methods.admins(accounts[0]).call()
      // const getQuests = await storeContract.methods.getQuests().call()

      setIsAdmin(isAdmin)
      // setGetQuest(getQuests)
      // this.setState({ isAdmin, getQuests })
      // let completedQuestString = ''
      // if (getQuests) {
      //   for (let i = 0; i < getQuests.length; i++) {
      //     const questStruct = await questNFTContract.methods.Quests(account, getQuests[i]).call()
      //     if (questStruct.exists) {
      //       completedQuestString += `<tr><td>${questStruct.quest}</td><td>${questStruct.URI}</td><td>${questStruct.timestamp}</td></tr>`
      //     }
      //   }
      // }
      // setCompletedQuestString(completedQuestString)
    } else {
      w.alert('County contract not deployed to detected network.')
    }
  }

  const handleQuestSubmition = async () => {
    const result = await submitQuestAnswers({
      variables: {
        input: {
          questId,
          questionAnswers,
          did,
        },
      },
    })
    if (result.data.submitQuestAnswers) {
      setQuestionAnswer([])
      setQuestResult(true)
      return toast({
        title: `Correct!`,
        status: 'success',
        isClosable: true,
      })
    }
    setQuestionAnswer([])
    setQuestResult(false)
    return toast({
      title: `Incorrect!`,
      status: 'error',
      isClosable: true,
    })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, [])
  return (
    <VStack spacing={0} w="100%">
      {auth.id ? (
        <Button bgColor="blue.100" onClick={() => handleQuestSubmition()}>
          Submit Quest Answers
        </Button>
      ) : (
        <Text>Login to Submit the answers</Text>
      )}
    </VStack>
  )
}
