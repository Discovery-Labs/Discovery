import React from 'react'
import { useRadio, Box, useColorModeValue } from '@chakra-ui/react'

const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: useColorModeValue('black', 'white'),
          color: useColorModeValue('white', 'black'),
          borderColor: useColorModeValue('black', 'white'),
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}>
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
