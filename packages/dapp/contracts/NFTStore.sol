pragma solidity >=0.5.0 <0.9.0;

/**
 * @title NFTStore
 * @dev Store NFTs and other information for ease of access to a front-end and querying

*/

import './Ownable.sol';


contract NFTStore is Ownable{
        mapping (address => bool) public admins;
        mapping (address => bool) public childNFTs;
        mapping (address => bool) public whiteList;
        mapping (address => bool) private blackList;

        event NFTAdded(address indexed added, uint indexed timeAdded);

        constructor(address[] memory _admins) public{
            for (uint i = 0; i<_admins.length; i++){
                admins[_admins[i]] = true;
            }
        }

        modifier onlyNFTContract(){
            require(childNFTs[msg.sender], "only child NFT contracts can call function");
            _;
        }

        modifier onlyAdmins(){
            require(admins[msg.sender], "only admin can call function");
            _;
        }

        function addChildNFT(address _childNFT) public isOwner{
            require(!childNFTs[_childNFT], "already a child NFT");
            childNFTs[_childNFT]= true;
            emit NFTAdded(_childNFT, block.timestamp);
        }

        function addAddressToWhiteList(address _address) public {
            require (!blackList[_address], "this address has been banned!");
            require (!whiteList[_address], "this address already on the white list!");
            whiteList[_address] = true;
            //possibly emit event
        }

        function addAddressToBlackList(address _address) public onlyAdmins{
            require (!blackList[_address], "this address already banned!");
            blackList[_address] = true;
            whiteList[_address] = false;
            //possibly emit event
        }
        
        
}