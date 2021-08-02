import React from "react";
import { VStack, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import Section from "../components/section";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";

const Paths = () => {
  const [address, setAddress] = useState();
  useEffect(() => {
    async function fetchUser() {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      setEventListeners(provider);

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

    fetchUser();
  }, []);

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
          </VStack>
        </Section>
      </VStack>
    </PageTransition>
  );
};

export default Paths;
