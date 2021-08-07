import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import { ChainIDParams } from 'caip'
import * as React from 'react'

interface Props extends FlexProps {
  label: string | ChainIDParams
  value: string
}

export const Property = (props: Props) => {
  const { label, value, ...flexProps } = props
  return (
    <Flex
      as="dl"
      direction={{ base: 'column', sm: 'row' }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
      {...flexProps}>
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </Flex>
  )
}
