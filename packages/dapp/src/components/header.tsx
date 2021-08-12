import React from 'react'
import {
  VStack,
  HStack,
  Button,
  Text,
  Box,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from './theme-toggle'
import { FiUsers, FiCode, FiChevronDown, FiZap, FiTablet } from 'react-icons/fi'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import discoverySimple from '../images/discovery-simple.png'

const AccountButton = dynamic(() => import('../client/components/AccountButton'), {
  ssr: false,
})

function NavLink(props: any) {
  const { href, name, ...rest } = props
  let isActive = false
  const { pathname } = useRouter()

  if (href !== '/') {
    const [, group] = href.split('/')

    isActive = pathname.includes(group)
  } else {
    if (href === pathname) {
      isActive = true
    }
  }

  return (
    <NextLink href={href} passHref>
      <Button
        aria-current={isActive ? 'page' : undefined}
        variant="ghost"
        size="md"
        {...rest}
        _activeLink={{
          color: useColorModeValue('blue.500', 'blue.200'),
        }}
        px={4}>
        {name}
      </Button>
    </NextLink>
  )
}

const Header = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      w="100%"
      zIndex={99}
      borderBottomWidth="2px"
      borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
      shadow="0 0 10px 0 rgba(0,0,0, 0.035);">
      <Box maxW="6xl" mx="auto">
        <VStack align="start" spacing={0}>
          <HStack justify="space-between" w="100%" h={16}>
            <HStack>
              <Box pl={2}>
                <Link href="/" passHref>
                  <Image src={discoverySimple} alt="Discovery" width={45} height={45} />
                </Link>
              </Box>
              <NavLink href="/paths" name="Paths" />
              <NavLink href="/getstarted" name="Get Started" />
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size="md"
                  px={4}
                  rightIcon={<FiChevronDown size={18} />}>
                  More
                </MenuButton>
                <MenuList>
                  <a href="http://google.com/">
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={FiCode}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Github</Text>
                      </HStack>
                    </MenuItem>
                  </a>
                  <a href="http://google.com/">
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={FiUsers}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Community</Text>
                      </HStack>
                    </MenuItem>
                  </a>
                  <Link href="/getinvolved" passHref>
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={FiZap}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Get Involved</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                  <Link href="/dashboard" passHref>
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={FiTablet}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Dashboard</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </HStack>
            <HStack>
              <ThemeToggle />
              <AccountButton />
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
export default Header
