import React from "react";
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
} from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import Section from "../components/section";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";

import ContentCard from "../components/content-card";

import NFTStore from "../abis/NFTStore.json";
import DiscoveryMergeNFT from "../abis/DiscoveryMergeNFT.json";
import QuestCompleteNFT from "../abis/QuestCompleteNFT.json";

const NFTStoreAddress = "0xe429c3885baa6b5b5ab2b2795467c803a04e6cb4";
const DiscoveryMergeNFTAddress = "0x7bfae155fa6a54f6fc09519652e681c2e1ba54b6";
const QuestCompleteNFTAddress = "0xa75b2928457a78a9beb9e0abd447554d11798a10";

export async function getStaticProps() {
  const categories = [
    {
      category: "polygon",
      id: "1",
      title: "Course How to Do X",
      description:
        "For 1 cup of uncooked quinoa,",
      image: "/abstract.png",
      link: "https://google.com",
    },
    {
      category: "polygon",
      id: "1",
      title: "Course How to Do X",
      description:
        "For 1 cup of uncooked quinoa,",
      image: "/abstract.png",
      link: "https://google.com",
    },
    {
      category: "polygon",
      id: "1",
      title: "Course How to Do X",
      description:
        "For 1 cup of uncooked quinoa,",
      image: "/abstract.png",
      link: "https://google.com",
    },
  ];

  return {
    props: {
      categories,
    },
    revalidate: 600,
  };
}

const Paths = ({ categories }) => {
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
    // setEventListeners(provider);
    setContracts(signer);
    console.log("Account:", userAddress);
  }

  // function setEventListeners(provider) {
  //   // Subscribe to accounts change
  //   provider.on("accountsChanged", (accounts) => {
  //     console.log(accounts);
  //   });

  //   // Subscribe to chainId change
  //   provider.on("chainChanged", (chainId) => {
  //     console.log(chainId);
  //   });

  //   // Subscribe to provider connection
  //   provider.on("connect", (info) => {
  //     console.log(info);
  //   });

  //   // Subscribe to provider disconnection
  //   provider.on("disconnect", (error) => {
  //     console.log(error);
  //   });
  // }

  function setContracts(signer) {
    // Assign contract
    const storeContract = new ethers.Contract(
      NFTStoreAddress,
      NFTStore,
      signer
    );
    const discoveryMergeNFTContract = new ethers.Contract(
      DiscoveryMergeNFTAddress,
      DiscoveryMergeNFT,
      signer
    );
    const questNFTContract = new ethers.Contract(
      QuestCompleteNFTAddress,
      QuestCompleteNFT,
      signer
    );
    setStoreContract(storeContract);
    setDiscoveryMergeNFTContract(discoveryMergeNFTContract);
    setQuestNFTContract(questNFTContract);
  }

  async function getOwner() {
    const address = await storeContract.console.log("address = ", address);
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
        <Section>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            w="100%"
          >
            <TabList display="flex" flexWrap="wrap">
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.500", "gray.500")}
                _selected={{
                  color: useColorModeValue("gray.100", "gray.800"),
                  bg: useColorModeValue("gray.900", "gray.100"),
                }}
                mr={2}
                mt={2}
              >
                <HStack spacing={1}>
                  <Text>Polygon</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.600", "gray.500")}
                _selected={{
                  color: "green.800",
                  bg: "green.100",
                }}
                mr={2}
                mt={2}
              >
                <HStack spacing={1}>
                  <Text>Ethereum</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.600", "gray.500")}
                _selected={{
                  color: "red.800",
                  bg: "red.100",
                }}
                mr={2}
                mt={2}
                s
              >
                <HStack spacing={1}>
                  <Text>The Graph</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.600", "gray.500")}
                _selected={{
                  color: "blue.800",
                  bg: "blue.100",
                }}
                mr={2}
                mt={2}
              >
                <HStack spacing={1}>
                  <Text>Bitcoin</Text>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacing={4} mt={8}>
                  {categories
                    .filter((el) => el.category === "polygon")
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
  );
};

export default Paths;
