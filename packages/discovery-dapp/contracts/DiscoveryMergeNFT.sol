pragma solidity >=0.5.0 <0.9.0;

/**
 * @title DiscoveryMergeNFT
 * @dev NFTs for merging course content on gitbook
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFTStore.sol";

contract DiscoveryMergeNFT is ERC721{

    NFTStore public masterStore;
    mapping (string => uint[]) courseIndices;
    mapping (string => uint) latestIndex;

    constructor(address _masterStoreAddress) ERC721("CommitGitBook", "CGB") public{
        masterStore = NFTStore(_masterStoreAddress);
        bool adminCheck = masterStore.admins(msg.sender);
        require(adminCheck, "deployer can't make NFT");
    } 


}