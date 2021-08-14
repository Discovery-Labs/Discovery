pragma solidity >=0.5.0 <0.9.0;

/**
 * @title DiscoveryMergeNFT
 * @dev NFTs for merging course content on gitbook
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFTStore.sol";

contract DiscoveryMergeNFT is ERC721{

    NFTStore public masterStore;
    uint tokenID;
    mapping (address => bool) approvers;
    mapping (string => uint[]) courseIndices;
    mapping (string => bool) public checkNFTURI;
    mapping (address => mapping(string => Commit[])) public Commits; //address --> course -> versions

    event NFTCommitMinted(address indexed _to, string indexed _tokenURI, string indexed course);

    constructor(address payable _masterStoreAddress) ERC721("CommitGitBook", "CGB") public{
        masterStore = NFTStore(_masterStoreAddress);
        bool adminCheck = masterStore.admins(msg.sender);
        require(adminCheck, "deployer can't make NFT");
    } 

    struct Commit {
        address receiver;
        string course;
        string URI;
        uint timestamp;
        uint version;
        bool exists;
    }

    modifier onlyApprover(){
        require(approvers[msg.sender], "only an approver can mint token");
        _;
    }

    function mintToken(address _to , string memory _tokenURI, string memory courseName, uint _version) public onlyApprover() {
        
        require(masterStore.whiteList(_to), "address is not registered!");
        require(!checkNFTURI[_tokenURI], "this URI already is being used!");
        //insert chainlink call
        tokenID++;
        _mint(_to, tokenID);
        checkNFTURI[_tokenURI] = true;
        
        Commit memory commit_to_add = Commit({
            receiver : _to,
            course : courseName,
            URI : _tokenURI,
            timestamp : block.timestamp,
            version : _version,
            exists : true
        });
        Commits[_to][courseName].push(commit_to_add);
        emit NFTCommitMinted(_to, _tokenURI, courseName);
    }

    function addApprover(address _approver) public {
        require (masterStore.admins(msg.sender), "only admins can perform this action");
        require (!approvers[_approver], "address is already an approver");
        approvers[_approver]=true;
    }
}