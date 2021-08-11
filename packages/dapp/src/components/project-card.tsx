import React from 'react'
import {
  HStack,
  VStack,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Link,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react'
import { FiGlobe, FiGithub } from 'react-icons/fi'
import Image from './image'
interface Card {
  id: string
  name: string
  description: string
  categories?: string[]
  logo?: string
  isFeatured?: boolean
  whitepaper?: string
  website?: string
  twitter?: string
  discord?: string
  github?: string
}
const ProjectCard = (props: Card) => {
  function getCategoryColor(category: string) {
    switch (category) {
      case 'polygon':
        return 'purple'
      case 'bsc':
        return 'yellow'
      case 'ethereum':
        return 'blue'
      case 'solana':
        return 'pink'
    }
  }
  return (
    <HStack
      p={4}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      w="100%"
      textAlign="left"
      align="start"
      justify="space-between"
      spacing={4}
      transition="all 0.25s"
      transition-timing-function="spring(1 100 10 10)"
      _hover={{ transform: 'translateY(-4px)', shadow: 'sm' }}>
      <HStack justify="space-between" align="center">
        <Box
          rounded="lg"
          pr={4}
          position="relative"
          overflow="hidden"
          lineHeight={0}
          boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)">
          <Box
            bg="whitesmoke"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            opacity={0.25}></Box>
          <Image
            src={props.logo ? props.logo : '/'}
            height={50}
            width={50}
            layout="fixed"
            rounded="md"></Image>
        </Box>
        <VStack align="stretch" justify="space-between" spacing={1} maxW="lg" h="100%">
          <HStack>
            {props.isFeatured ? <Badge>⭐️</Badge> : null}
            <Stack direction="row">
              {props.categories?.map((category) => (
                <Badge colorScheme={getCategoryColor(category)}>{category}</Badge>
              ))}
            </Stack>
          </HStack>
          <VStack align="start">
            <Text fontWeight="bold" fontSize="md" noOfLines={2}>
              {props.name}
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.200')}>
              {props.description}
            </Text>
          </VStack>
        </VStack>
      </HStack>
      {/* change box hello to grid */}
      <SimpleGrid columns={1} spacing={2}>
        {props.website ? (
          <Link href={props.website} isExternal>
            <FiGlobe />
          </Link>
        ) : null}
        {props.github ? (
          <Link href={props.github} isExternal>
            <FiGithub />
          </Link>
        ) : null}
      </SimpleGrid>
    </HStack>
  )
}

export default ProjectCard
