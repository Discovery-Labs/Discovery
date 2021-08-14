var NFTStore = artifacts.require("./NFTStore.sol");
var DiscoveryMergeNFT = artifacts.require("./DiscoveryMergeNFT.sol");
var QuestCompleteNFT = artifacts.require("./QuestCompleteNFT.sol");
var ChainlinkNFT = artifacts.require("./ChainlinkNFT.sol");

module.exports = async(deployer, network, accounts) => {
  let deployNFTStore = await deployer.deploy(NFTStore, [accounts[0], accounts[1]]);
  const contractNFTStore = await NFTStore.deployed();
  let deployChainlinkNFT = await deployer.deploy(ChainlinkNFT);
  const contractCheckNFT = await ChainlinkNFT.deployed();
  let deployMergeNFT = await deployer.deploy(DiscoveryMergeNFT, contractNFTStore.address);
  let deployQuestCompleteNFT = await deployer.deploy(QuestCompleteNFT, contractNFTStore.address, contractCheckNFT.address);
  const contractQuestCompleteNFT = await QuestCompleteNFT.deployed();
  const contractDiscoveryMergeNFT = await DiscoveryMergeNFT.deployed();
  await contractNFTStore.addChildNFT(contractQuestCompleteNFT.address);
  await contractNFTStore.addChildNFT(contractDiscoveryMergeNFT.address);
};