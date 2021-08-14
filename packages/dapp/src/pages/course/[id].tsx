import { Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { addApolloState, initializeApollo } from '../../../lib/apolloClient'
// import CourseGridCard from '../../components/course-grid-card'
import OpenGraphMeta from '../../components/OpenGraphMeta'
import PageTransition from '../../components/page-transitions'
import Section from '../../components/section'
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
      <VStack spacing={8}>
        <Section>
          <Heading size="xl" margin={{ horizontal: 'none', vertical: 'small' }}>
            {course.title}
          </Heading>
          <Heading size="lg" margin={{ horizontal: 'none', vertical: 'small' }}>
            {course.description}
          </Heading>
        </Section>
      </VStack>
    </PageTransition>
  )
}

export default Course
