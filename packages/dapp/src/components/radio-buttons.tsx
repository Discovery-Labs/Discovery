import React, { useState } from 'react'
import { Divider, VStack, useRadioGroup, useToast, Text, Button } from '@chakra-ui/react'
import RadioCard from './radio-card'

const RadioButtons = ({ quiz }: any) => {
  const toast = useToast()
  const [chosen, setChosen] = useState('')
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'option',
    defaultValue: 'default',
    onChange: (nextValue: string) => {
      setChosen(nextValue)
      console.log(nextValue)
    },
  })
  const group = getRootProps()

  function verifyResult() {
    if (chosen === quiz.answer) {
      console.log('Correct')
      toast({
        title: `Correct!`,
        status: "success",
        isClosable: true,
      })
    } else {
      console.log('Incorrect')
    }
  }

  return (
    <VStack {...group} py="6">
      <Text>{quiz.question}</Text>
      {quiz.choices.map((choice: string) => {
        const radio = getRadioProps({ value: choice })
        return (
          <RadioCard key={choice} {...radio}>
            {choice}
          </RadioCard>
        )
      })}
      <Button colorScheme="pink" onClick={verifyResult}>
        Verify
      </Button>
      <Divider orientation="horizontal" />
    </VStack>
  )
}

export default RadioButtons
