import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Button,
  Box,
  Divider,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react'
import Image from 'next/image'

import { FiChevronsRight, FiCircle } from 'react-icons/fi'

import PageTransition from '../components/page-transitions'
import Container from '../components/container'
import { useEffect, useState } from 'react'

import { Popover } from '../components/Popover'
import banner from '../images/banner.png'
import GridCard from '../components/grid-card'

// import { addApolloState, initializeApollo } from '../../lib/apolloClient'
// import { ALL_PROJECTS_QUERY } from '../graphql/projects'

// export async function getStaticProps() {
// const apolloClient = initializeApollo()
// const projects = await apolloClient.query({
//   query: ALL_PROJECTS_QUERY,
// })
// return addApolloState(apolloClient, {
//   props: {
//     projects: projects.data.getAllProjects,
//   },
//   revalidate: 600,
// })
// }

// interface Cards {
//   projects: [
//     {
//       name: string
//       description: string
//       categories: string[]
//       github: string
//       color: string
//     }
//   ]
// }

interface Project {
  name: string
  description: string
  categories: string[]
  github: string
}

// const Paths = (props: Cards) => {
const Paths = () => {
  const [sortedProjects, setSortedProjects] = useState<Project[]>([])

  useEffect(() => {
    console.log(sortedProjects)
  })
  const projects = [
    {
      id: '1',
      name: 'Metamask',
      description: 'All the ethereum scaling solutions',
      categories: ['wallets'],
      github: 'https://google.com',
    },
    {
      id: '2',
      name: 'Chainlink',
      description: 'All the ethereum scaling solutions',
      categories: ['defi'],
      github: 'https://google.com',
    },
    {
      id: '3',
      name: 'Polygon',
      description: 'All the ethereum scaling solutions',
      categories: ['derivatives', 'defi'],
      github: 'https://google.com',
    },
    {
      id: '4',
      name: 'Polygon',
      description: 'All the ethereum scaling solutions',
      categories: ['security'],
      github: 'https://google.com',
    },
    {
      id: '5',
      name: 'Polygon',
      description: 'All the ethereum scaling solutions',
      categories: ['privacy'],
      github: 'https://google.com',
    },
  ]

  function handleCheckbox(e: string[]) {
    const newSortedProjects = projects.filter(function (el) {
      return el.categories.some((category) => e.includes(category))
    })
    setSortedProjects(newSortedProjects)
    console.log(newSortedProjects)
  }
  return (
    <PageTransition>
      <Container>
        <HStack spacing={6} align="start">
          <VStack>
            <Box position="fixed" w="250px">
              {/* Categories */}
              <Heading as="h4" size="md" pt="24px" pb="6px">
                CATEGORIES
              </Heading>
              <Divider orientation="horizontal" />
              <CheckboxGroup
                onChange={(e: string[]) => handleCheckbox(e)}
                colorScheme="green"
                defaultValue={['wallets', 'derivatives', 'defi', 'security', 'privacy']}>
                <VStack align="start" pt="12px">
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="wallets">
                    Wallets
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="derivatives">
                    Derivatives
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="defi">
                    DeFi
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="security">
                    Security
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="privacy">
                    Privacy
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
              {/* Difficuty */}
              <Heading as="h4" size="md" pt="24px" pb="6px">
                Difficulty
              </Heading>
              <Divider orientation="horizontal" />
              <CheckboxGroup colorScheme="green" defaultValue={['beginner']}>
                <VStack align="start" pt="12px">
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="beginner">
                    Beginner
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="intermediate">
                    Intermediate
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="advanced">
                    Advanced
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>
            {/* Space for fixed filter bar */}
            <Box w="250px" />
          </VStack>
          <VStack w="100%" align="stretch">
            <Image src={banner} alt="ethereum"></Image>
            <HStack w="100%" align="baseline" justify="space-between">
              <Heading as="h2" size="xl">
                All projects
              </Heading>
              <Box d="flex">
                <Text fontSize="sm" color="gray.500">
                  SELL ALL
                </Text>
                <FiChevronsRight size={24} />
              </Box>
            </HStack>
            <SimpleGrid columns={[2, null, 3]} spacing={4}>
              {/* Need a new solution here, I am going to sleep */}
              {sortedProjects.length !== 0
                ? sortedProjects.map((el) => (
                    <GridCard name={el.name} description={el.description} />
                  ))
                : projects.map((el) => <GridCard name={el.name} description={el.description} />)}
            </SimpleGrid>
          </VStack>
        </HStack>
      </Container>
    </PageTransition>
  )
}
export default Paths
