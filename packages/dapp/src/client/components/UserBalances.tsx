import { HStack, Text, Wrap, WrapItem, Avatar } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import { useEnvState, useKnownDIDsData } from '../hooks'
import axios from 'axios'
import { utils } from 'ethers'

type Item = {
  contract_decimals: number
  contract_ticker_symbol: string
  contract_address: string
  logo_url: string
  balance: number
  quote: number
  quote_rate: number
  type: string
}

enum ChainID {
  Ethereum = 1,
  Polygon = 137,
  MumbaiTestnet = 80001,
  BSC = 56,
  Avalanche = 43114,
  AvalancheTestnet = 43113,
  Fantom = 250,
}

const instance = axios.create({
  baseURL: 'https://api.covalenthq.com/v1',
})

interface API {
  api: string | undefined
}
export default function UserBalances(props: API) {
  const { auth } = useEnvState()
  const knownDids = useKnownDIDsData()
  const [balances, setBalances] = useState([])
  const currentUser = knownDids && auth.id ? knownDids[auth.id] : null

  function div18(balance: number) {
    const decBalance = utils.formatUnits(balance, 18)
    return Number.parseFloat(decBalance).toFixed(2)
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log('Getting balances for: ', currentUser?.accounts[0].address)
    currentUser &&
      props?.api &&
      instance
        .get(
          `/${ChainID.Ethereum}/address/${currentUser.accounts[0].address}/balances_v2/?nft=true&key=${props.api}`
        )
        .then(function (response) {
          // handle success
          const { data } = response
          setBalances(data.data.items)
          console.log(data.data.items)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
  }, [currentUser, props.api])

  return (
    <>
      <Text pt="4" color="gray" fontSize="lg">
        Balances
      </Text>
      <Text fontWeight="bold" fontSize="2xl">
        {balances.length === 0 ? (
          <p>Loading..</p>
        ) : (
          balances
            .filter((el: Item) => el.type === 'cryptocurrency')
            .map((el: Item, i: number) => (
              <HStack spacing="6" py="2" key={i}>
                <Wrap>
                  <WrapItem>
                    <Avatar bg="whiteAlpha.50" size="xs" name="logo" src={el.logo_url} />{' '}
                  </WrapItem>
                </Wrap>
                <Text>
                  {div18(el.balance)} {el.contract_ticker_symbol}
                </Text>
              </HStack>
            ))
        )}
      </Text>
    </>
  )
}
