import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  Divider,
  useColorModeValue,
  Badge,
  AvatarGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  AvatarBadge,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { FiExternalLink } from 'react-icons/fi'

import PageTransition from '../../components/page-transitions'
import Container from '../../components/container'
import RadioButtons from '../../components/radio-buttons'
import { useState } from 'react'

import { Course } from './interfaces'
import { addApolloState, initializeApollo } from '../../../lib/apolloClient'
import { ALL_PROJECTS_QUERY, PROJECT_BY_ID_QUERY } from '../../graphql/projects'

const SubmitQuestAnswersButton = dynamic(
  () => import('../../client/components/SubmitQuestAnswersButton'),
  {
    ssr: false,
  }
)
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get projects
  const apolloClient = initializeApollo()
  const projects = await apolloClient.query({
    query: ALL_PROJECTS_QUERY,
  })

  // Get the paths we want to pre-render based on projects
  const paths = projects.data.getAllProjects.map((project: any) => ({
    params: { id: project.id.split('//')[1] },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: Record<string, string> }) {
  const apolloClient = initializeApollo()
  const projectId = `ceramic://${params.id}`
  const project = await apolloClient.query({
    query: PROJECT_BY_ID_QUERY,
    variables: {
      projectId,
    },
  })

  return addApolloState(apolloClient, {
    props: {
      project: project.data.getProjectById,
    },
    revalidate: 600,
  })
}
const ProjectPage = ({ project }: any) => {
  const [course, setCourse] = useState<Course>()
  const [questionAnswers, setQuestionAnswer] = useState<Array<Record<string, string>>>()

  return (
    <PageTransition>
      <Container>
        <HStack spacing={6} align="start">
          <VStack>
            <Box position="fixed" w="250px">
              <Heading as="h4" size="md" pt="24px" pb="6px">
                Overview
              </Heading>
              <Divider orientation="horizontal" />
              {project &&
                project.courses.map((course, i) => (
                  <VStack align="start" pt="12px" spacing={0} p="2">
                    <Box as="button" alignContent="start" onClick={() => setCourse(course)}>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="md">
                          Course {i + 1}
                        </Text>
                        <Text fontSize="md"> {course.title} </Text>
                        <Text fontSize="sm"> {course.difficulty} </Text>
                      </VStack>
                    </Box>
                    <Divider orientation="horizontal" />
                  </VStack>
                ))}
              <VStack w="100%" align="stretch">
                <Button colorScheme="blackAlpha" isDisabled>
                  Mint NFT
                </Button>
              </VStack>
            </Box>
            <Box w="250px" />
          </VStack>
          <VStack w="100%" align="stretch">
            {course ? (
              <>
                <VStack
                  align="center"
                  rounded="xl"
                  borderWidth="1px"
                  py="6"
                  spacing={0}
                  color={useColorModeValue('white', 'black')}
                  bgGradient={useColorModeValue(
                    'linear(to-l, pink.700, purple.900)',
                    'linear(to-l, pink.200, purple.700)'
                  )}>
                  <Badge fontSize="8px" colorScheme="gray">
                    {course.difficulty}
                  </Badge>
                  <Heading as="h2" size="3xl" p={4}>
                    {course.title}
                  </Heading>
                  <Heading as="h3" size="l">
                    Description
                  </Heading>
                  <Text>{course.description}</Text>
                  <HStack align="baseline" spacing="2" pt={6}>
                    <a href={course.gitbook}>GitBook</a> <FiExternalLink />
                  </HStack>
                </VStack>
                <VStack align="start">
                  <Heading as="h2" size="xl">
                    Course Content
                  </Heading>
                  <Box d="flex">
                    <Text fontSize="sm" color="gray.500">
                      {course?.quests.length} Quests
                    </Text>
                  </Box>
                </VStack>
                <Accordion allowToggle>
                  {course &&
                    course.quests.map((quest: any, i: number) => (
                      <AccordionItem key={quest.id}>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" fontSize="md">
                              Quest {i + 1} {' : '}
                            </Text>
                            <Text fontSize="lg"> {quest.name} </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Text fontSize="md"> {quest.description} </Text>
                          {quest.questions.map((quiz: any, i: number) => (
                            <RadioButtons
                              key={i}
                              quiz={quiz}
                              setQuestionAnswer={setQuestionAnswer}
                            />
                          ))}

                          <SubmitQuestAnswersButton
                            setQuestionAnswer={setQuestionAnswer}
                            questionAnswers={questionAnswers}
                            questId={quest.id}
                          />

                          <Text fontSize="md"> Completed by </Text>
                          <AvatarGroup size="sm" max={2} p="2">
                            {quest.completedBy &&
                              quest.completedBy.map((user: string) => (
                                <AvatarBadge key={user} name={user} />
                              ))}
                          </AvatarGroup>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                </Accordion>
              </>
            ) : (
              <Text>Select a course to get started</Text>
            )}
          </VStack>
        </HStack>
      </Container>
    </PageTransition>
  )
}

export default ProjectPage
