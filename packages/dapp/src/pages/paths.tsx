import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
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

import banner from '../images/banner.png'
import ProjectGridCard from '../components/project-grid-card'

import { addApolloState, initializeApollo } from '../../lib/apolloClient'
import { ALL_PROJECTS_QUERY } from '../graphql/projects'
import { ALL_TAGS_QUERY } from '../graphql/tags'

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  const projects = await apolloClient.query({
    query: ALL_PROJECTS_QUERY,
  })
  const tags = await apolloClient.query({
    query: ALL_TAGS_QUERY,
  })

  console.log({
    projects: projects.data.getAllProjects,
    tags: tags.data.getAllTags,
  })
  return addApolloState(apolloClient, {
    props: {
      projects: projects.data.getAllProjects,
      tags: tags.data.getAllTags,
    },
    revalidate: 600,
  })
}

export interface Tag {
  id: string
  name: string
  color: string
}

interface Project {
  id: string
  name: string
  description: string
  color: string
  tags: Array<Tag>
  github: string
}

const Paths = ({ projects, tags }: { projects: Array<Project>; tags: Array<Tag> }) => {
  const [sortedProjects, setSortedProjects] = useState<Array<Project>>([])
  const [filter] = useState(() => (tags && tags.length > 0 ? tags.map((tag) => tag.name) : []))
  useEffect(() => {
    console.log(sortedProjects)
  })

  function handleCheckbox(e: Array<string>) {
    const newSortedProjects = projects.filter((el: Project) => {
      return el.tags && el.tags.some((tag) => e.includes(tag.name))
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
              {tags && tags.length > 0 && (
                <CheckboxGroup
                  onChange={(e: Array<string>) => handleCheckbox(e)}
                  colorScheme="green"
                  defaultValue={filter}>
                  <VStack align="start" pt="12px">
                    {tags.map((tag) => (
                      <Checkbox
                        key={tag.id}
                        icon={<FiCircle />}
                        colorScheme={tag.color}
                        value={tag.name}>
                        {tag.name}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              )}
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
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="expert">
                    Expert
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="cyan" value="wizar">
                    Wizard
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
              {sortedProjects.length !== 0
                ? sortedProjects.map((el) => (
                    <ProjectGridCard
                      id={el.id.split('//')[1]}
                      bgColor={el.color}
                      tags={el.tags}
                      key={el.name}
                      name={el.name}
                      description={el.description}
                    />
                  ))
                : projects.map((el) => (
                    <ProjectGridCard
                      id={el.id.split('//')[1]}
                      bgColor={el.color}
                      tags={el.tags}
                      key={el.name}
                      name={el.name}
                      description={el.description}
                    />
                  ))}
            </SimpleGrid>
          </VStack>
        </HStack>
      </Container>
    </PageTransition>
  )
}
export default Paths
