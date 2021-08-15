import React from 'react'
import { HStack, VStack, Text, useColorModeValue, Heading, Badge } from '@chakra-ui/react'
import { FiUser, FiThumbsUp } from 'react-icons/fi'
import { useRouter } from 'next/router'
interface CourseCard {
  id: string
  title: string
  description: string
  difficulty: string
  courseType: string
}

const CourseGridCard = ({ id, title, description, difficulty, courseType }: CourseCard) => {
  const router = useRouter()
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => router.push(`/course/${id}`)}>
      <VStack
        px="24px"
        py="12px"
        rounded="xl"
        borderWidth="1px"
        bg={useColorModeValue('white.100', 'gray.800')}
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        transition="all 0.25s"
        transition-timing-function="spring(1 100 10 10)"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'md',
          textDecoration: 'none',
        }}
        overflow="hidden"
        align="start"
        spacing={0}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Badge fontSize="8px" colorScheme="green">
            {difficulty}
          </Badge>
          <Badge fontSize="8px" colorScheme={courseType === 'branched' ? 'yellow' : 'blue'}>
            {courseType}
          </Badge>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Heading as="h2" size="lg" mr="5">
            {title}
          </Heading>
        </div>
        <Text fontSize="md" fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.100')}>
          {description}
        </Text>
        <HStack>
          <FiUser />
          <Text fontSize="sm">2354</Text>
          <FiThumbsUp />
          <Text fontSize="sm">99%</Text>
        </HStack>
      </VStack>
    </div>
  )
}

export default CourseGridCard
