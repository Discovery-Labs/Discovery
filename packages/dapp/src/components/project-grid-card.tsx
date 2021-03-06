import React from 'react'
import { HStack, VStack, Text, useColorModeValue, Heading, Badge } from '@chakra-ui/react'
import { FiUser, FiThumbsUp } from 'react-icons/fi'
import { Tag } from '../pages/paths'
import Image from 'next/image'
interface ProjectCard {
  id: string
  name: string
  bgColor: string
  description: string
  tags: Array<Tag>
}
import { useRouter } from 'next/router'

const ProjectGridCard = ({ id, name, description, tags, bgColor }: ProjectCard) => {
  const router = useRouter()
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => router.push(`/project/${id}`)}>
      <VStack
        px="24px"
        py="12px"
        rounded="xl"
        borderWidth="1px"
        bg={useColorModeValue(`${bgColor}.100`, `${bgColor}.800`)}
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Heading as="h2" size="lg" mr="5">
            {name}
          </Heading>
          <Image alt="" src={`/${name.toLowerCase()}-logo.png`} width="65" height="65" />
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

export default ProjectGridCard
