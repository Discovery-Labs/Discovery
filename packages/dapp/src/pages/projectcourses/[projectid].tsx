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
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from '@chakra-ui/react'

import { FiExternalLink } from 'react-icons/fi'

import PageTransition from '../../components/page-transitions'
import Container from '../../components/container'
import RadioCard from '../../components/radio-card'
import RadioButtons from '../../components/radio-buttons'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Project, Course, CourseDifficultyEnum, RarityEnum } from './interfaces'
import { requestedProject } from './requestDataExample'

const ProjectPage = () => {
  const router = useRouter()
  const [project, setProject] = useState<Project>()
  const [course, setCourse] = useState<Course>()

  // Get Project ID for getProjectById
  function getProjectId() {
    console.log(router.query.projectid)
  }

  return (
    <PageTransition>
      <Container>
        <HStack spacing={6} align="start">
          <VStack>
            <Box position="fixed" w="250px">
              {/* Categories */}
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
                    course.quests.map((quest, i) => (
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
                          {quest.questions.map((quiz) => (
                            <RadioButtons quiz={quiz}></RadioButtons>
                          ))}

                          <Text fontSize="md"> Completed by </Text>
                          <AvatarGroup size="sm" max={2} p="2">
                            {quest.completedBy.map((user) => (
                              <Avatar name={user} />
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
