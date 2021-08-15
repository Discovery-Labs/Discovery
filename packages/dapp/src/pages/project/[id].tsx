import {
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { FiChevronsRight, FiCircle } from 'react-icons/fi'
import { addApolloState, initializeApollo } from '../../../lib/apolloClient'
import OpenGraphMeta from '../../components/OpenGraphMeta'
import PageTransition from '../../components/page-transitions'
import Section from '../../components/section'
import { ALL_PROJECTS_QUERY, PROJECT_BY_ID_QUERY } from '../../graphql/projects'
import banner from '../../images/banner.png'
import CourseGridCard from '../../components/course-grid-card'
import Container from '../../components/container'

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

  console.log(project.data.getProjectById.courses)

  return addApolloState(apolloClient, {
    props: {
      project: project.data.getProjectById,
    },
    revalidate: 600,
  })
}
const Project = ({ project }: any) => {
  return (
    <PageTransition>
      <Head>
        <title>Discovery | {project.name}</title>
        <OpenGraphMeta />
      </Head>
      <VStack spacing={8} mb={10}>
        <Section>
          <Heading size="xl" margin={{ horizontal: 'none', vertical: 'small' }}>
            {project.name}
          </Heading>
          <Heading size="md" margin={{ horizontal: 'none', vertical: 'small' }}>
            {project.description}
          </Heading>
        </Section>
      </VStack>
      <Container>
        <HStack spacing={6} align="start">
          <VStack>
            <Box position="fixed" w="250px">
              {/* Categories */}
              <Heading as="h4" size="md" pt="24px" pb="6px">
                PATH
              </Heading>
              <Divider orientation="horizontal" />
              <CheckboxGroup
                colorScheme="green"
                // onChange={(e: Array<string>) => handleCheckbox(e)}
                // defaultValue={filter}
              >
                <VStack align="start" pt="12px">
                  <Checkbox icon={<FiCircle />} colorScheme="blue" value="branched">
                    Branch&apos;ed
                  </Checkbox>
                  <Checkbox icon={<FiCircle />} colorScheme="blue" value="decrypted">
                    Decrypt&apos;ed
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
                All courses
              </Heading>
              <Box d="flex">
                <Text fontSize="sm" color="gray.500">
                  SELL ALL
                </Text>
                <FiChevronsRight size={24} />
              </Box>
            </HStack>
            <SimpleGrid columns={[2, null, 3]} spacing={4}>
              {project.courses &&
                project.courses.length > 0 &&
                project.courses.map((el: any) => (
                  <CourseGridCard
                    id={el.id.split('//')[1]}
                    key={el.id}
                    title={el.title}
                    difficulty={el.difficulty}
                    courseType={el.courseType}
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

export default Project
