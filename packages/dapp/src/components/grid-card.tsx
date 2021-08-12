import React from 'react'
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Box,
  Heading,
  Badge,
  Link,
} from '@chakra-ui/react'
import Image from './image'
import { FiUser, FiThumbsUp } from 'react-icons/fi'
interface Card {
  name: string
  description: string
}

const GridCard = ({ name, description }: Card) => {
  return (
    <a href="/">
      <VStack
        px="24px"
        py="12px"
        rounded="xl"
        borderWidth="1px"
        bg={useColorModeValue('white', 'gray.800')}
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
        <Badge fontSize="8px" colorScheme="green">
          Wallet
        </Badge>
        <Heading as="h4" size="sm">
        {name}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.100')}>{description}</Text>
        <HStack>
          <FiUser />
          <Text fontSize="sm">2354</Text>
          <FiThumbsUp />
          <Text fontSize="sm">99%</Text>
        </HStack>
      </VStack>
    </a>
  )
}

export default GridCard
