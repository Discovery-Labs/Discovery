import NFTStore from '../abis/NFTStore.json';
import DiscoveryMergeNFT from '../abis/DiscoveryMergeNFT.json';
import QuestCompleteNFT from '../abis/QuestCompleteNFT.json';
import ChainlinkNFT from '../abis/ChainlinkNFT.json';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import parse from 'html-react-parser';
//const { Web3Storage, getFilesFromPath, File} = require('web3.storage');
//TODO: Remove html-react-parser bootstrap react-bootstrap
const Web3 = require('web3');

class Quests extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: null,
      account: null,
      storeContract: null,
      questNFTContract:null,
      discoveryMergeNFTContract:null,
      chainLinkNFTContract : null,
      currentCID : "",
      storageToken : "",
      dbText : "",
      quest_1_Text : "",
      quest_2_Text : "",
      quest_3_Text : "",
      quest_1_complete : false,
      quest_2_complete : false,
      quest_3_complete : false,
      isAdmin : false,
      questString : "",
      questData : [],
      getQuests : [],
      completedQuestString : "",
      URIString : "",
      chainlinkAddress : "",
      allowMint : 0,
    }

    this.storeIPFS = this.storeIPFS.bind(this);
    this.returnData = this.returnData.bind(this);
    this.updateQuest = this.updateQuest.bind(this);
    this.clearData = this.clearData.bind(this);
    this.RegisterAddress = this.RegisterAddress.bind(this);
    this.addQuest = this.addQuest.bind(this);
    this.addURI = this.addURI.bind(this);
    this.getURI = this.getURI.bind(this);
  }

  async componentDidMount() {

    await this.loadWeb3();
    await this.loadBlockchainData();
    this.callBackendAPI()
      .then(res => this.setState({ data: res.welcome, storageToken : res.token }))
      .catch(err => console.log(err));
    this.setEventListeners();

  }

    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/welcome');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  /******Put in useEffect on initial render? */
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  /******Put in useEffect on initial render? */

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkNFTStoreData = NFTStore.networks[networkId]
    const networkQuestNFTData = QuestCompleteNFT.networks[networkId]
    const networkDiscoveryMergeNFTData = DiscoveryMergeNFT.networks[networkId];
    const networkChainLinkNFTData = ChainlinkNFT.networks[networkId];

    if(networkNFTStoreData) {
      // Assign contract
      const storeContract = new web3.eth.Contract(NFTStore.abi, networkNFTStoreData.address);
      const questNFTContract = new web3.eth.Contract(QuestCompleteNFT.abi, networkQuestNFTData.address);
      const discoveryMergeNFTContract = new web3.eth.Contract(DiscoveryMergeNFT.abi, networkDiscoveryMergeNFTData.address);
      const chainLinkNFTContract = new web3.eth.Contract(ChainlinkNFT.abi, networkChainLinkNFTData.address);
      const allowMint = await chainLinkNFTContract.methods.allowMint().call();
      this.setState({storeContract, questNFTContract , discoveryMergeNFTContract, chainLinkNFTContract, chainlinkAddress : networkChainLinkNFTData.address});
      const checkStorage = localStorage.getItem(this.state.account);
      if(!checkStorage){
        localStorage.setItem(this.state.account, 'NNN');
      }
      else{
        if(localStorage.getItem(this.state.account)[0] === 'Y'){
          this.setState({quest_1_complete : true})
        }
        if(localStorage.getItem(this.state.account)[1] === 'Y'){
          this.setState({quest_2_complete : true})
        }
        if(localStorage.getItem(this.state.account)[2] === 'Y'){
          this.setState({quest_3_complete : true})
        }
      }
      const isAdmin = await storeContract.methods.admins(this.state.account).call();
      const getQuests = await storeContract.methods.getQuests().call();
      this.setState({isAdmin, getQuests});
      let completedQuestString = "";
      if(getQuests){
        for(var i = 0 ; i< getQuests.length; i++){
          const questStruct = await questNFTContract.methods.Quests(this.state.account, getQuests[i]).call();
          if (questStruct.exists){
            completedQuestString += `<tr><td>${questStruct.quest}</td><td>${questStruct.URI}</td><td>${questStruct.timestamp}</td></tr>`
          }
        }
      }
      this.setState({completedQuestString});
    }
      else {
      window.alert('County contract not deployed to detected network.')
    }
  }

  setEventListeners(){
  window.ethereum.on('accountsChanged', async (accounts) => {
    const checkSumAddress = window.web3.utils.toChecksumAddress(accounts[0]);
    this.setState({account : checkSumAddress});
    const checkStorage = localStorage.getItem(this.state.account);
    /**********Don't need */
    this.setState({quest_1_complete : false, quest_2_complete : false, quest_3_complete : false})
    if(!checkStorage){
      localStorage.setItem(this.state.account, 'NNN');
    }
    else{
      if(localStorage.getItem(this.state.account)[0] === 'Y'){
        this.setState({quest_1_complete : true})
      }
      if(localStorage.getItem(this.state.account)[1] === 'Y'){
        this.setState({quest_2_complete : true})
      }
      if(localStorage.getItem(this.state.account)[2] === 'Y'){
        this.setState({quest_3_complete : true})
      }
    }
    /***********Stop Don't need */
    const isAdmin = await this.state.storeContract.methods.admins(this.state.account).call();
    this.setState({isAdmin});
  });

  /*****can set other listeners */
  this.state.questNFTContract.events.NFTRequestMade()
    .on('data', (event) => {
      window.alert(`quest : ${event.returnValues.quest} and bytes: ${event.returnValues.requestID}`);
    });

    this.state.chainLinkNFTContract.events.callbackRan()
    .on('data', (event) => {
      window.alert(event.returnValues.questComplete);
    });
}

/*
makeFileObjects = () => {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { hello: 'world' }
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'hello.json')
  ]
  return files
}

 storeFiles = async (files) => {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

retrieveFiles = async (cid) => {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  }

  // unpack File objects from the response
  const files = await res.files()
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
  }
}
*/


storeIPFS = async () => {
  /*
  const hash = await SDS.students.put( `test-${this.state.counter}`, {text: `${this.state.dbText}`, studentID : `s${Math.floor(Math.random()*100) + 1}`});
  alert(hash);
  this.state.counter++;
  this.setState({dbText : ""});*/


}

returnData = async () => {
  /*
  const value = SDS.students.get(`test-${this.state.counter-1}`);
  alert(`text: ${value.text} and studentID : ${value.studentID}`);
  */
 alert(localStorage.getItem(this.state.account))
}

clearData = async () => {
  localStorage.setItem(this.state.account , 'NNN');
  this.setState({quest_1_complete : false, quest_2_complete : false, quest_3_complete : false});
}

/* Need in app*/

RegisterAddress = async () => {
  await this.state.storeContract.methods.addAddressToWhiteList(this.state.account).send({from : this.state.account});
}

/* Need in app*/
addQuest = async () => {
  await this.state.storeContract.methods.addApprovedQuest(this.state.questString).send({from : this.state.account})
  .on('error' , () => {this.setState({questString : ""})});
  this.setState({questString : ""});
}

/* Need in app*/
addURI = async () => {
  await this.state.chainLinkNFTContract.methods.setBaseURI(this.state.URIString).send({from : this.state.account})
  .on('error' , () => {this.setState({URIString : ""})});
  this.setState({URIString : ""});
}

/*might be nice for demo*/
getURI = async () => {
  const currentURI = await this.state.chainLinkNFTContract.methods.getBaseURI().call();
  alert(currentURI);
}

/*need part of this function*/
updateQuest = async (questNumber) => {

  if (questNumber == 1){
    if (this.state.quest_1_Text.trim() !== "Polygon-1"){
      alert('not correct!');
      this.setState({quest_1_Text : ""});
      return;}
    var currentQuestString = localStorage.getItem(this.state.account);
    currentQuestString = 'Y' + currentQuestString.substring(1);
    localStorage.setItem(this.state.account , currentQuestString);
    this.setState({quest_1_Text : "", quest_1_complete : true});
  }
  if (questNumber == 2){
    if (this.state.quest_2_Text.trim() !== "Polygon-2"){
      alert('not correct!');
      this.setState({quest_2_Text : ""});
      return;}
    var currentQuestString = localStorage.getItem(this.state.account);
    currentQuestString = currentQuestString.substring(0,1) + 'Y' + currentQuestString.substring(2);
    localStorage.setItem(this.state.account , currentQuestString);
    this.setState({quest_2_Text : "", quest_2_complete : true});
  }
  if (questNumber == 3){
    if (this.state.quest_3_Text.trim() !== "Polygon-3"){
      alert('not correct!');
      this.setState({quest_3_Text : ""});
      return;}
    var currentQuestString = localStorage.getItem(this.state.account);
    currentQuestString = currentQuestString.substring(0,2) + 'Y';
    localStorage.setItem(this.state.account , currentQuestString);
    this.setState({quest_3_Text : "", quest_3_complete : true});
  }

  if(localStorage.getItem(this.state.account) === 'YYY'){
    const isRegistered = await this.state.storeContract.methods.whiteList(this.state.account).call();
    if(!isRegistered){
      alert('This address is not registered yet! Please register with your DID');
      return;
    }
    const NFTAlreadyExists = await this.state.questNFTContract.methods.NFTExists("Polygon", this.state.account).call();
    if(NFTAlreadyExists){
      alert('This address already has this current NFT! Try another quest');
      return;
    }
    const isApproved = await this.state.storeContract.methods.approvedQuests("Polygon").call();
    if(!isApproved){
      alert('This quest is not approved');
      return;
    }
    const tokenURI = `ipfs://${Math.floor(Math.random()*10000)+1}_${Math.floor(Math.random()*10000)+1}`;
    await this.state.questNFTContract.methods.mintToken(this.state.account, tokenURI, "Polygon", 1).send({from : this.state.account});
    //alert ('Congrats you earned an NFT!');
  }
}

  render(){
    return (
      <div className = "Container">
        <div className="App">
          <header className="App-header">
          <h2>
          {this.state.data}
          </h2>


          </header>
        </div>
        <div>
        {this.state.account}<br></br>
        {this.state.chainlinkAddress}

        </div>
          <div className="columns">
            <div className="cols" style={{width: "2%", textAlign: "center"}}></div>
		        <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "success" size = "lg" onClick = {this.getURI}>Get URI</Button>
            </div>

            <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "info" size = "lg" onClick = {this.returnData} >Get Quest Data</Button>
            </div>
            <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "info" size = "lg" onClick = {this.clearData} >Clear Quest Data</Button>
            </div>
            <div className="cols" style={{width: "19%", textAlign: "center"}}>
              Web3 Storage Token:
            </div>
            <div className="cols" style={{width: "25%", maxWidth: "250px", overflowX: "scroll", textAlign: "center"}}>
                {this.state.storageToken}
            </div>

          </div>

          <div className="columns">
            <div className="cols" style={{width: "2%", textAlign: "center"}}></div>
		        <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "success" size = "lg" onClick = {this.RegisterAddress}>Register!</Button>
            </div>

            <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "info" size = "lg" onClick = {this.addQuest} >Add Quest (admin only)</Button>
            </div>
            <div className="cols" style={{width: "25%", textAlign: "center"}}>
              <input type = "text" style ={{width: "98%", backgroundColor : this.state.isAdmin ? "beige" : "gainsboro"}} readOnly = {!this.state.isAdmin} value = {this.state.questString} placeholder = "enter new Quest name" onChange = {(e) => {this.setState({questString : e.target.value})}}/>
            </div>
            <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <Button variant = "primary" size = "md" onClick = {this.addURI} >Base URI (owner only)</Button>
            </div>
            <div className="cols" style={{width: "18%", textAlign: "center"}}>
              <input type = "text" style ={{width: "98%", backgroundColor : this.state.isAdmin ? "beige" : "gainsboro"}} readOnly = {!this.state.isAdmin} value = {this.state.URIString} placeholder = "enter new Base URI" onChange = {(e) => {this.setState({URIString : e.target.value})}}/>
            </div>
          </div>

          <div className="columns" style={{backgroundColor : "green", color: "beige", marginTop: "2em", border:"2px solid black"}}>
            <div className="cols" style={{width: "1%"}}></div>
		        <div className="cols" style={{width: "49%", borderRight: "2px solid white"}}>
              <div className="mini-container">
                <div className = "mini-columns">
                <h4 style={{textAlign : "center", width: "100%"}}><em><u>Polygon Quest</u></em></h4>
                </div>
                <div className="mini-columns" style = {{marginTop: "0.25em"}}>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "right", paddingRight:"0.5em"}}>
                    Quest_1 - type "Polygon-1" exactly:
                  </div>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "center"}}>
                    <input type = "text" style ={{width: "98%", backgroundColor : this.state.quest_1_complete ? "gray" : "beige"}} readOnly = {this.state.quest_1_complete} value = {this.state.quest_1_Text} placeholder = "enter text for quest 1" onChange = {(e) => {this.setState({quest_1_Text : e.target.value})}}/>
                  </div>
                  <div className = "mini-cols" style={{width : "20%", textAlign : "center"}}>
                    <Button variant = "info" size = "md" onClick = {() => this.updateQuest(1)} >Quest 1</Button>
                  </div>

                </div>
                <div className="mini-columns" style = {{marginTop: "0.5em"}}>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "right", paddingRight:"0.5em"}}>
                  Quest_2 - type "Polygon-2" exactly:
                  </div>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "center"}}>
                    <input type = "text" style ={{width: "98%", backgroundColor : this.state.quest_2_complete ? "gray" : "beige"}} readOnly = {this.state.quest_2_complete} value = {this.state.quest_2_Text} placeholder = "enter text for quest 2" onChange = {(e) => {this.setState({quest_2_Text : e.target.value})}}/>
                  </div>
                  <div className = "mini-cols" style={{width : "20%", textAlign : "center"}}>
                    <Button variant = "info" size = "md" onClick = {() => this.updateQuest(2)} >Quest 2</Button>
                  </div>
                </div>
                <div className="mini-columns" style = {{marginTop: "0.5em"}}>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "right", paddingRight:"0.5em"}}>
                  Quest_3 - type "Polygon-3" exactly:
                  </div>
                  <div className = "mini-cols" style={{width : "40%", textAlign : "center"}}>
                    <input type = "text" style ={{width: "98%", backgroundColor : this.state.quest_3_complete ? "gray" : "beige"}} readOnly = {this.state.quest_3_complete} value = {this.state.quest_3_Text} placeholder = "enter text for quest 3" onChange = {(e) => {this.setState({quest_3_Text : e.target.value})}}/>
                  </div>
                  <div className = "mini-cols" style={{width : "20%", textAlign : "center"}}>
                    <Button variant = "info" size = "md" onClick = {() => this.updateQuest(3)} >Quest 3</Button>
                  </div>
                </div>

                <div className="mini-columns" style = {{marginTop: "0.5em", marginBottom: "0.25em"}}>

                </div>
              </div>
            </div>

            <div className="cols" style={{width: "49%"}}>
              <div className="mini-container">
                <div className="mini-columns">
                  <h4 style={{textAlign : "center", width: "100%"}}><em><u>Quests Completed by You</u></em></h4>
                </div>
                <div className = "mini-columns">
                  <div className = "mini-cols" style={{width : "1%"}}></div>
                  <div className = "mini-cols" style={{width : "96%", maxHeight: "150px", overflowY: "scroll", backgroundColor: "gainsboro"}}>
                    <Table striped bordered hover size="sm" >
                      <thead>
                        <tr>
                          <th>Quest</th>
                          <th>Token URI</th>
                          <th>Date Completed</th>
                        </tr>
                      </thead>
                      <tbody style={{fontSize : "93%"}}>
                        {parse(this.state.completedQuestString)}
                      </tbody>
                    </Table>
                  </div>
                  <div className = "mini-cols" style={{width : "1%"}}></div>
                </div>
              </div>
            </div>
            <div className="cols" style={{width: "1%"}}></div>
          </div>
      </div>
    );
  }
}

export default Quests;
