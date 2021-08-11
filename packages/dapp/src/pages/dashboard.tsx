import React, { useState, useEffect } from 'react'
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import { FiUser, FiTv, FiLayout, FiDollarSign, FiPlus, FiActivity, FiClock } from 'react-icons/fi'
import dynamic from 'next/dynamic'
import ProjectCard from '../components/project-card'
import NewProjectModal from '../components/new-project-modal'
import PageTransition from '../components/page-transitions'

const Username = dynamic(() => import('../client/components/Username'), {
  ssr: false,
})
const UserBalances = dynamic(() => import('../client/components/UserBalances'), {
  ssr: false,
})
const UserNFTs = dynamic(() => import('../client/components/UserNFTs'), {
  ssr: false,
})

const projects = [
  {
    id: '1',
    name: 'Course How to Do X',
    description: 'For 1 cup of uncooked quinoa,',
    categories: ['polygon', 'bsc'],
    logo: '/abstract.png',
    website: 'https://google.com',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Course How to Do X',
    description: 'For 1 cup of uncooked quinoa,',
    categories: ['ethereum'],
    logo: '/abstract.png',
    website: 'https://google.com',
  },
  {
    id: '3',
    name: 'Course How to Do X',
    description: 'For 1 cup of uncooked quinoa,',
    categories: ['solana'],
    logo: '/abstract.png',
    website: 'https://google.com',
    github: 'https://github.com',
  },
]

export default function Dashboard() {
  const [display, changeDisplay] = useState('hide')
  const [value, changeValue] = useState(1)

  const API = process.env.NEXT_PUBLIC_COV_API

  function createProject() {}

  return (
    <PageTransition>
      <Flex
        h={[null, null, '100vh']}
        maxW="2000px"
        flexDir={['column', 'column', 'row']}
        overflow="hidden">
        {/* Column 1 */}
        <Flex w={['100%', '100%', '10%', '15%', '15%']} flexDir="column" alignItems="center">
          <Flex flexDir="column" h={[null, null, '100vh']} justifyContent="space-between">
            <Flex flexDir="column" as="nav" pos="fixed">
              <Heading
                mt={100}
                mb={[10, 25, 50]}
                fontSize={['4xl', '4xl', '2xl', '3xl', '4xl']}
                letterSpacing="tight">
                Menu
              </Heading>
              <Flex
                flexDir={['row', 'row', 'column', 'column', 'column']}
                align={['center', 'center', 'center', 'flex-start', 'flex-start']}
                wrap={['wrap', 'wrap', 'nowrap', 'nowrap', 'nowrap']}
                justifyContent="center">
                <VStack justify="start" align="start" spacing={8}>
                  <HStack>
                    <Link display={['none', 'none', 'flex', 'flex', 'flex']}>
                      <Icon as={FiLayout} fontSize="2xl" className="active-icon" />
                    </Link>
                    <Link
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Text className="active">Active projects</Text>
                    </Link>
                  </HStack>
                  <HStack>
                    <Link display={['none', 'none', 'flex', 'flex', 'flex']}>
                      <Icon as={FiTv} fontSize="2xl" className="active-icon" />
                    </Link>
                    <Link
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Text className="active">Active courses</Text>
                    </Link>
                  </HStack>
                  <HStack justify="start" align="start">
                    <Link display={['none', 'none', 'flex', 'flex', 'flex']}>
                      <Icon as={FiUser} fontSize="2xl" className="active-icon" />
                    </Link>
                    <Link
                      _hover={{ textDecor: 'none' }}
                      display={['flex', 'flex', 'none', 'flex', 'flex']}>
                      <Text className="active">Profile</Text>
                    </Link>
                  </HStack>
                </VStack>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Column 2 */}
        <Flex
          w={['100%', '100%', '60%', '60%', '55%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome back,{' '}
            <Flex display="inline-flex" fontWeight="bold">
              <Username />
            </Flex>
          </Heading>
          <UserBalances api={API} />
          <UserNFTs api={API} />
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <Heading as="h2" size="lg" letterSpacing="tight">
                Active Projects
              </Heading>
            </Flex>
            <NewProjectModal />
          </Flex>
          <SimpleGrid columns={[1, 1]} spacing={4} mt={8}>
            {projects.map((el) => (
              <ProjectCard
                id={el.id}
                name={el.name}
                description={el.description}
                logo={el.logo}
                website={el.website}
                categories={el.categories}
                isFeatured={el.isFeatured}
                github={el.github}
              />
            ))}
          </SimpleGrid>
        </Flex>

        {/* Column 3 */}

        <Flex w={['100%', '100%', '30%']} borderWidth="1px" p="3%" flexDir="column" rounded="3xl">
          <Heading letterSpacing="tight">My Progress</Heading>
          <Box align="center" py="6">
            <CircularProgress value={40} color="green.400" size="200px">
              <CircularProgressLabel>Lvl 4</CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Flex flexDir="column" my={4}>
            <Flex justify="space-between" mb={2}>
              <Text>Experience point</Text>
              <Text fontWeight="bold">12836 xp</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Experience to go</Text>
              <Text fontWeight="bold">23102 xp</Text>
            </Flex>
          </Flex>
          <Heading letterSpacing="tight" size="md" my={4}>
            Sponsoring
          </Heading>
          <Flex>
            <AvatarGroup size="md" max={3}>
              <Avatar src="avatar-2.jpg" />
              <Avatar src="avatar-3.jpg" />
              <Avatar src="avatar-4.jpg" />
              <Avatar src="avatar-4.jpg" />
              <Avatar src="avatar-4.jpg" />
            </AvatarGroup>
            <Avatar icon={<FiPlus />} ml={2} color="#fff" bgColor="gray.300" />
          </Flex>
          <Text color="gray" mt={10} mb={2}>
            Sponsor a instructor/project
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FiActivity color="gray.700" />} />
            <Input type="number" placeholder="Address" />
          </InputGroup>
          <Text color="gray" mt={4} mb={2}>
            Sum
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FiDollarSign color="gray.700" />} />
            <Input type="number" placeholder="1 ETH" />
          </InputGroup>
          <Text color="gray" mt={4} mb={2}>
            Time
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FiClock color="gray.700" />} />
            <Input type="number" placeholder="00 20 00" />
          </InputGroup>
          <Button mt={4} bgColor="blackAlpha.900" color="#fff" p={7} borderRadius={15}>
            Start streaming
          </Button>
        </Flex>
        <Box p={4}></Box>
      </Flex>
    </PageTransition>
  )
}
