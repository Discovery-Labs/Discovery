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
import Container from './container'
import { useRouter } from 'next/router'
import ThemeToggle from './theme-toggle'
import { UserGroup, Code, ChevronDown, LightningBolt } from 'heroicons-react'
import Link from 'next/link'
import AvatarNavigation from './avatar-navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import logo from '../images/logo.svg'

const AccountButton = dynamic(() => import('../client/components/AccountButton'), {
  ssr: false,
})

function NavLink(props: any) {
  const { href, name, ...rest } = props
  var isActive = false
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
      <Container>
        <VStack align="start" spacing={0}>
          <HStack justify="space-between" w="100%" h={16}>
            <HStack>
              <Link href="/">
                <Image src={logo as StaticImageData} alt="Self.ID" />
              </Link>
            </HStack>
            <HStack ml={-4} spacing={2}>
              <NavLink href="/paths" name="Paths" />
              <NavLink href="/getstarted" name="Get Started" />
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size="md"
                  px={4}
                  rightIcon={<ChevronDown size={18} />}>
                  Links
                </MenuButton>
                <MenuList>
                  <a href="http://google.com/">
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={Code}
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
                          as={UserGroup}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Community</Text>
                      </HStack>
                    </MenuItem>
                  </a>
                  <Link href="/getinvolved">
                    <MenuItem>
                      <HStack>
                        <Icon
                          as={LightningBolt}
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                        <Text>Get Involved</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </HStack>
            <HStack>
              <ThemeToggle mobile={false} />
              <AccountButton />
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
export default Header
