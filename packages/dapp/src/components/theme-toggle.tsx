import React from 'react'
import { IconButton, useColorMode, ScaleFade, Tooltip } from '@chakra-ui/react'
import useSound from 'use-sound'
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [play] = useSound('switch.mp3', {
    volume: 0.05,
    sprite: {
      on: [0, 300],
      off: [500, 300],
    },
  })

  const handleClick = () => {
    toggleColorMode()
    colorMode === 'dark' ? play({ id: 'on' }) : play({ id: 'off' })
  }

  return (
    <Tooltip label={colorMode === 'dark' ? 'Light mode' : 'Dark mode'} aria-label="A tooltip">
      <IconButton
        isRound
        aria-label="Switch theme"
        icon={
          colorMode === 'dark' ? (
            <ScaleFade in>
              <FiSun size={20} />
            </ScaleFade>
          ) : (
            <ScaleFade in>
              <FiMoon size={20} />
            </ScaleFade>
          )
        }
        onClick={handleClick}
      />
    </Tooltip>
  )
}
export default ThemeToggle
