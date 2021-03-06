import React from 'react'
import { HStack, VStack, Text, useColorModeValue, Box, Link } from '@chakra-ui/react'

interface Card {
  name: string
  image: JSX.Element | null
  link: string
}
const SocialCard = ({ name, image, link }: Card) => {
  return (
    <Link href={link} isExternal>
      <HStack
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        w="100%"
        textAlign="left"
        align="start"
        spacing={4}
        transition="all 0.25s"
        transition-timing-function="spring(1 100 10 10)"
        _hover={{ transform: 'translateY(-4px)', shadow: 'sm' }}>
        <Box
          rounded="lg"
          p={2}
          position="relative"
          overflow="hidden"
          lineHeight={0}
          boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)">
          <Box
            bg="whiteAlpha.50"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            opacity={0.25}></Box>
          {image}
        </Box>

        <VStack align="start" justify="flex-start" spacing={1} maxW="lg" h="100%">
          <VStack spacing={0} align="start">
            <Text fontWeight="bold" fontSize="md" noOfLines={2}>
              {name}
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </Link>
  )
}

export default SocialCard
