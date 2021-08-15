pragma solidity >=0.5.0 <0.9.0;

/**
 * @title ChainlinkNFT
 * @dev Contract for calling chainlink when verifying NFT Mint requests
*/

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./Ownable.sol";

contract ChainlinkNFT is ChainlinkClient, Ownable{
    using Chainlink for Chainlink.Request;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string private baseURI;
    uint public allowMint; 

    event callbackRan(uint questComplete);

    /**
     * Network: Matic Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    
    
    constructor() public {
    	setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        //setPublicChainlinkToken();
        oracle = 0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D; //0xc8D925525CA8759812d0c299B90247917d4d4b7C; //0x58BBDbfb6fca3129b91f0DBE372098123B38B5e9; 
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4"; 
        fee = 10 ** 16; // 0.01 LINK
    }

    

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */

     /*
    constructor() public {
        //setPublicChainlinkToken();
        setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 10 ** 17; // (Varies by network and job)
    }

    */

    receive() external payable {

    }

    function setBaseURI(string memory _newBase) public isOwner{
        baseURI = _newBase;
    }

    function getBaseURI() public view returns(string memory){
        return baseURI;
    }

    function requestCeramicData(string memory _did, string memory _questName) public returns (bytes32 _requestId){
        string memory paramString = string(abi.encodePacked("?did=", _did, "&quest=", _questName));
    	Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillCeramicData.selector);
    	req.add("get", baseURI); //this is API endpoint for server.js or later our server endpoint in cloud or fleek/ENS
    	req.add("queryparams", paramString);
        req.add("path", "questComplete");

        return sendChainlinkRequestTo(oracle, req, fee);
    }

    /**
     * Callback function
     */
    function fulfillCeramicData(bytes32 _requestId, uint256 _questComplete) public recordChainlinkFulfillment(_requestId) {
    	allowMint = _questComplete;

        emit callbackRan(_questComplete);
    }
}