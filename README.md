![discovery-simple](https://user-images.githubusercontent.com/32299095/129428669-2201fd4a-d1e3-496a-b54d-4ab1e4703e4e.png)

# Discovery

Discovery - a gamified learning platform where members of the official protocols team collaborate with content creators and researchers, developers or security experts to create high-quality courses that are built around open source trustable and verifiable content. These communities allow learners to take courses in groups or individually, at their own pace, to spread their knowledge and goodwill by becoming mentors, to take charge of their own learning by voting on community proposals or building on the protocols.

You can think of it like this: (**Gitbook + Github + Udemy + Reddit**) \* **_Web3_** = **Discovery**.

On Github, developers collaborate to create software together, in part of something called “open source software”, which is based on a gift economy--doing it mostly out of intrinsic motivation. On Udemy, users can create and upload video courses, which other users will then take. Discovery takes the “open-source-community-collaboration” model of Github, but instead of software, users collaborate to create courses.

In a nutshell, we marry the architectural framework of Github with the content of Udemy to create and sustain a new model of online education that we call open source learning.

Why will the crowdsourcing of educational content work? First, we already see many examples where tapping into the “wisdom of the crowd” has created massive success. Take for example Wikipedia or Quora. Secondly, we see many people are willing to collaborate and help others out online, such as on Github or StackExchange. Finally, we see a growing move towards the “online”, and if education wants to keep up, it needs to innovate. With the proper inventization schemes put into place to guide the wisdom of the crowd, we can create an engaging e-learning platform that helps out all those seeking to learn.

### How it's made:

We started working on the initial idea during the Hack Money 2021 but we were few developers. So we were focused on the feasibility and the research in relation to the project architecture.
We learned a lot and the idea evolved, so we decided to start from scratch. A new architecture where our resources are as much decentralized as possible.

We like to use the right tool for the job, so:

- we are using Gitbook to create educative content (like many other protocols), so we've created a Github Action that can be plugged in any repo (gitbook or code) and the files of the repo will be uploaded to FileCoin and IPFS through web3.storage. We then generate and NFT that contains metadata such as the ipfs urls/ CIDs of the files of the repo, the name of the authors, the Github commit id, etc. We then upload that NFT to NFT.storage and we also create a Ceramic Document that contains the IFPS url/CID returned by NFT.storage.
- we went for Ceramic and IDX as our main data & authentication layer (it handles relationships between records and structures our data model)
- for the quests, we are using Chainlink to make a GET request from our NFT SmartContract to our Ceramic Instance through an API Consumer contract in order to validate that the requester has the permission to mint an NFT(quest completed & hasn't already minted his NFT)

We'd like to deploy the dapp as well as our Chailink API Consumer contract to the Polygon Mumbai Testnet. And Mikel is working on a new course that will go through the best DeFi projects on Polygon.

We will use as much data as we can from various subgraphs. For example, on the AAVE lesson, if we are explaining what deposit APY means then we will display the deposit APY for xDAI from the AAVE Subgraph
