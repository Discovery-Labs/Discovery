pragma solidity >=0.5.0 <0.9.0;

/**
 * @title QuestCompleteNFT
 * @dev NFTs for completing course content on Discovery
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFTStore.sol";

contract QuestCompleteNFT is ERC721{

    NFTStore public masterStore;
    mapping (string => mapping (address => bool)) NFTExists;
    mapping (string => uint) latestIndices;
    mapping (address => mapping (string => string)) public getNFTURIsByAddress;


    event NFTMinted(address indexed _to, string indexed _tokenURI);

    constructor(address _masterStoreAddress) ERC721("CompletedDiscoveryQuest", "CDQ") public{
        masterStore = NFTStore(_masterStoreAddress);
        bool adminCheck = masterStore.admins(msg.sender);
        require(adminCheck, "deployer can't make NFT");
    }

    function mintToken(address _to , string memory _tokenURI, string memory questType) public {
        //access control logic?
        require(!NFTExists[questType][_to], "this address already has an NFT for this quest!");
        _mint(_to, ++latestIndices[questType]);
        NFTExists[questType][_to] = true;
        emit NFTMinted(_to, _tokenURI);
    }


}