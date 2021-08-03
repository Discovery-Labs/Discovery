import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from 'next/link'


export default function Home() {
  const [address, setAddress] = useState();
  useEffect(() => {
    async function fetchUser() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const userAddress = await signer.getAddress()
      setAddress(userAddress)
      console.log("Account:", userAddress);

      // const provider = new ethers.providers.Web3Provider(
      //   window.ethereum,
      //   "any"
      // );
      // // Prompt user for account connections
      // await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner();
      // console.log("Account:", await signer.getAddress());
    }

    fetchUser();
  },[]);
  return <div>Hello world</div>; {address}
}
