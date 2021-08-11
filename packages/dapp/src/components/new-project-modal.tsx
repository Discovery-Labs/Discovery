import {
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  FormLabel,
  ModalContent,
  ModalBody,
  FormControl,
  ModalFooter,
  Input,
  IconButton
} from '@chakra-ui/react'
import {
  FiPlusCircle,
} from 'react-icons/fi'
import React, { useState, useEffect } from 'react'




export default function NewProjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const finalRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      <IconButton onClick={onOpen} aria-label="icon-button" icon={<FiPlusCircle />} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
