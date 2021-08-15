import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import Head from 'next/head'
import { FiExternalLink } from 'react-icons/fi'
import { addApolloState, initializeApollo } from '../../../lib/apolloClient'
// import CourseGridCard from '../../components/course-grid-card'
import OpenGraphMeta from '../../components/OpenGraphMeta'
import PageTransition from '../../components/page-transitions'
import RadioButtons from '../../components/radio-buttons'
import { GET_ALL_COURSES_QUERY, GET_COURSE_BY_ID_QUERY } from '../../graphql/courses'

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get courses
  const apolloClient = initializeApollo()
  const courses = await apolloClient.query({
    query: GET_ALL_COURSES_QUERY,
  })

  // Get the paths we want to pre-render based on courses
  const paths = courses.data.getAllCourses.map((course: any) => ({
    params: { id: course.id.split('//')[1] },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: Record<string, string> }) {
  const apolloClient = initializeApollo()
  const courseId = `ceramic://${params.id}`
  const course = await apolloClient.query({
    query: GET_COURSE_BY_ID_QUERY,
    variables: {
      courseId,
    },
  })

  console.log(course.quests)

  return addApolloState(apolloClient, {
    props: {
      course: course.data.getCourseById,
    },
    revalidate: 600,
  })
}
const Course = ({ course }: any) => {
  return (
    <PageTransition>
      <Head>
        <title>Discovery | {course.title}</title>
        <OpenGraphMeta />
      </Head>
      <HStack>
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
                        {quest.questions &&
                          quest.questions.map((quiz: any) => (
                            <RadioButtons key={quiz} quiz={quiz}></RadioButtons>
                          ))}

                        <Text fontSize="md"> Completed by </Text>
                        <AvatarGroup size="sm" max={2} p="2">
                          {quest.completedBy &&
                            quest.completedBy.map((user: string) => (
                              <Avatar key={user} name={user} />
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
    </PageTransition>
  )
}

export default Course
