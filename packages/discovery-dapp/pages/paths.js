import React from "react";
import { VStack, Text, Heading, useColorModeValue, Button } from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import Section from "../components/section";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";

import NFTStore from '../abis/NFTStore.json';
import DiscoveryMergeNFT from '../abis/DiscoveryMergeNFT.json';
import QuestCompleteNFT from '../abis/QuestCompleteNFT.json';

const NFTStoreAddress = "0xe429c3885baa6b5b5ab2b2795467c803a04e6cb4";
const DiscoveryMergeNFTAddress = "0x7bfae155fa6a54f6fc09519652e681c2e1ba54b6";
const QuestCompleteNFTAddress = "0xa75b2928457a78a9beb9e0abd447554d11798a10";

const Paths = () => {
  const [address, setAddress] = useState();
  const [storeContract, setStoreContract] = useState();
  const [discoveryMergeNFTContract, setDiscoveryMergeNFTContract] = useState();
  const [questNFTContract, setQuestNFTContract] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    setAddress(userAddress);
    setEventListeners(provider);
    setContracts(signer);
    console.log("Account:", userAddress);
  }

  function setEventListeners(provider) {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log(error);
    });
  }

  function setContracts(signer) {
      // Assign contract
      const storeContract = new ethers.Contract(NFTStoreAddress, NFTStore, signer)
      const discoveryMergeNFTContract = new ethers.Contract(DiscoveryMergeNFTAddress, DiscoveryMergeNFT, signer)
      const questNFTContract = new ethers.Contract(QuestCompleteNFTAddress, QuestCompleteNFT, signer)
      setStoreContract(storeContract)
      setDiscoveryMergeNFTContract(discoveryMergeNFTContract)
      setQuestNFTContract(questNFTContract)
  }

  async function getOwner() {
    const address = await storeContract.
    console.log('address = ', address)
  }
  return (
    <PageTransition>
      <VStack spacing={8}>
        <Section>
          <VStack>
            <Text
              fontSize={["m", "l"]}
              color={useColorModeValue("gray.800", "gray.600")}
              maxW="lg"
              textAlign="center"
            >
              Connected with: {address}
            </Text>
            <Heading as="h1">Paths</Heading>
            <Text
              fontSize={["xl", "2xl"]}
              color={useColorModeValue("gray.500", "gray.200")}
              maxW="lg"
              textAlign="center"
            >
              Discovery paths categories: social entertainment, video, virtual
              reality, art & collectibles
            </Text>
            <Button onClick={getOwner}>Click</Button>
          </VStack>
        </Section>
      </VStack>
    </PageTransition>
  );
};

export default Paths;
