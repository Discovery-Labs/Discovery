import {
  Popover as ChakraPopover,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
} from '@chakra-ui/react'
import useSound from 'use-sound'

import { Paragraph } from '../Paragraph'

import { PopoverProps } from './types'

const popoverBackgroundCss = {
  backgroundColor: 'var(--popover-background-color)',
}

const popoverColorCss = {
  color: 'var(--popover-color)',
}

export function Popover({ buttonContent, popoverTextElement, ...rest }: PopoverProps) {
  const [play] = useSound('/menu-open.mp3', { volume: 0.2 })

  const handleClick = () => {
    play()
  }

  return (
    <ChakraPopover aria-label={popoverTextElement} placement="top" {...rest}>
      <PopoverTrigger>
        <Button
          height="unset"
          onClick={handleClick}
          variant="unstyled"
          minWidth="unset"
          marginLeft={2}>
          {buttonContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent css={popoverBackgroundCss}>
        <PopoverArrow css={popoverBackgroundCss} />
        <PopoverCloseButton color="var('popover-text-color')" />
        <PopoverBody>
          <Paragraph css={popoverColorCss} size="sm">
            {popoverTextElement}
          </Paragraph>
        </PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
}
