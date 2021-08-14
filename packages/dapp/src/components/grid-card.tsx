import React from 'react'
import { HStack, VStack, Text, useColorModeValue, Heading, Badge } from '@chakra-ui/react'
import { FiUser, FiThumbsUp } from 'react-icons/fi'
import { Tag } from '../pages/paths'
interface Card {
  name: string
  description: string
  tags: Array<Tag>
}

const GridCard = ({ name, description, tags }: Card) => {
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
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => (
            <Badge key={tag.id} fontSize="8px" colorScheme="green">
              {tag.name}
            </Badge>
          ))}
        <Heading as="h4" size="sm">
          {name}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.100')}>
          {description}
        </Text>
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
