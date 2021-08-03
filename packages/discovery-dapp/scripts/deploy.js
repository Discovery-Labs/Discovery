const hre = require("hardhat");

async function main() {
  const adminAddress = "<admin Address>"

  const NFTStore = await hre.ethers.getContractFactory("NFTStore");
  const contractNFTStore = await NFTStore.deploy(adminAddress);
  await contractNFTStore.deployed();
  console.log("contractNFTStore deployed to:", contractNFTStore.address);
  
  const DiscoveryMergeNFT = await hre.ethers.getContractFactory("DiscoveryMergeNFT");
  const contractDiscoveryMergeNFT = await DiscoveryMergeNFT.deploy(contractNFTStore.address);
  await contractDiscoveryMergeNFT.deployed();
  console.log("contractDiscoveryMergeNFT deployed to:", contractDiscoveryMergeNFT.address);
  
  const QuestCompleteNFT = await hre.ethers.getContractFactory("QuestCompleteNFT");
  const contractQuestCompleteNFT = await QuestCompleteNFT.deploy(contractNFTStore.address);
  await contractQuestCompleteNFT.deployed();
  console.log("QuestCompleteNFT deployed to:", contractQuestCompleteNFT.address);

  await contractNFTStore.addChildNFT(contractQuestCompleteNFT.address);
  await contractNFTStore.addChildNFT(contractDiscoveryMergeNFT.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });