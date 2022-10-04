// import Web3 from "web3";
// import VoterAbi from "../src/MyComponents/votingAbi.json";
// import React from "react";

// let contractAddress = "0xEAC3ce292F95d779732e7a26c95c57A742cf5119";
// //Create Provider Instance
// const web3Provider = new Web3(Web3.givenProvider);
// console.log(web3Provider, "web3");
// //Create Contract Instance
// const NewContract = new web3Provider.eth.Contract(VoterAbi, contractAddress);
// console.log(NewContract, "New Contract");

// export function ContractsCall(props) {
//     let {setAddress,setWinner,setParties,address,winner} = props;

//   async function updateAccount() {
//     window.ethereum.on("accountsChanged", async function (accounts) {
//       console.log(accounts, "account changed");
//       this.setAddress(accounts[0]);
//     });
//   }

//   //Connect Metamask Or Login With This Function
//   async function SignInMetamask(e) {
//     // Creating Instance Of Web3
//     try {
//       e.preventDefault();
//       console.log("hello");
//       //Check if Metamask is Installed Or Not
//       if (window.ethereum) {
//         let { ethereum } = window;
//         let account = await ethereum.request({ method: "eth_requestAccounts" });
//         console.log(account, "acccc");
//         //set Account Address of Logged In User
//         this.setAddress(account[0]);

//         const proposals = await NewContract.methods.getAllProposals().call();
//         console.log(proposals, "proposals");

//         let proposalJson = proposals.map((items) => ({
//           name: items[0],
//           proposalId: items[1],
//           totalVotes: items[2],
//           logo: items[3],
//         }));
//         console.log(proposalJson, "proposalJson");
//         this.setParties(proposalJson);
//       } else {
//         //If Metamask Not Installed Or Not Connected
//         window.alert("please connect metamask");
//       }
//     } catch (error) {
//       console.log("Something Wrong ", error.message);
//     }
//   }

//   //   console.log(parties, "parties after setState");
//   //   console.log(address, "address ");

//   //Function for vote to Parties
//   async function Vote(e) {
//     let proposalId = e.target.id;
//     console.log("button click vote", this.address);
//     const votingStatus = await NewContract.methods
//       .vote(proposalId, this.address)
//       .send({
//         from: this.address,
//         gas: 0x93990,
//       });
//     console.log(votingStatus, "votng Status");
//   }

//   async function getResult() {
//     try {
//       const votingResult = await NewContract.methods
//         .getWinner(this.address)
//         .call();
//       console.log(votingResult, "voting result");
//       console.log(this.winner, "winner ");
//       this.setWinner({
//         name: votingResult[0],
//         totalVotes: parseInt(votingResult[1]),
//       });
//     } catch (error) {
//       console.log(error.message, "err catch");
//     }
//   }
// }
