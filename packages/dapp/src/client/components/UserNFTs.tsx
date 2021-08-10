import { HStack, Text, Link } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import { useEnvState, useKnownDIDsData } from '../hooks'
import axios from 'axios'
import { FiExternalLink } from 'react-icons/fi'
import { jsx } from '@emotion/react'
type Item = {
  contract_decimals: number
  contract_ticker_symbol: string
  contract_address: string
  logo_url: string
  balance: number
  quote: number
  quote_rate: number
  type: string
  contract_name: string
  nft_data: NFTData[]
}

type NFTData = {
  token_id: string
  token_balance: string
  token_url: string
  original_owner: string
  external_data: {
    name: string
    description: null
    image: string
    animation_url: string
    owner: string
  }
  owner: string
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
export default function UserNFTs(props: API) {
  const { auth } = useEnvState()
  const knownDids = useKnownDIDsData()
  const [balances, setBalances] = useState([])
  const currentUser = knownDids && auth.id ? knownDids[auth.id] : null

  useEffect(() => {
    // Update the document title using the browser API
    console.log('Getting balances for: ', currentUser?.accounts[0].address)
    instance
      .get(
        `/1/address/0x75750d0bba74ecb961fa588873a0ef69c54361c1/balances_v2/?nft=true&key=${props?.api}` // Random wallet Used to show 2 NFTs as example
        // `/${ChainID.MumbaiTestnet}/address/${currentUser?.accounts[0].address}/balances_v2/?nft=true&key=${props?.api}`
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
  }, [currentUser])

  return (
    <Text fontWeight="bold" fontSize="2xl">
      {balances.length === 0 ? (
        <p>Loading..</p>
      ) : (
        balances
          .filter((el: Item) => el.type === 'nft' && el.balance > 0)
          .map((el: Item, i: number) => (
            <Link href={el.nft_data[0].external_data.image} isExternal>
              <HStack spacing="6" py="2" key={i}>
                {JSON.stringify(el)}
                <FiExternalLink />
                <Text>
                  {el.balance} {el.contract_name}
                </Text>
              </HStack>
            </Link>
          ))
      )}
    </Text>
  )
}
