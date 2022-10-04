import "./App.css";
import { VotingCard } from "../src/MyComponents/VotingCard";
import { Header } from "../src/MyComponents/Header";
import { Signup } from "./MyComponents/Signup";
// import { Footer } from './MyComponents/Footer';
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Web3 from "web3";
import VoterAbi from "../src/MyComponents/votingAbi.json";
import { Web3Modal } from "../src/MyComponents/Modal";

let contractAddress = "0x613da9111789b4c229969c9aa6778a9b81adb091";
//Create Provider Instance
const web3Provider = new Web3(Web3.givenProvider);
console.log(web3Provider, "web3");
//Create Contract Instance
const NewContract = new web3Provider.eth.Contract(VoterAbi, contractAddress);
console.log(NewContract, "New Contract");

function App() {
  //Creating a State For Voting Parties
  // let [teams, setTeams] = useState([]);
  let [address, setAddress] = useState([]);
  let [winner, setWinner] = useState();
  let [parties, setParties] = useState([]);

  // console.log(parties, "parties state");
  // console.log(winner, "winner ");
  useEffect(() => {
    UpdateAcc();
    console.log(parties, "parties useeffct function");
  }, [parties, address]);

  //--------------------------------------
  //return true if user logged in
  function isLogin() {
    if (address.length !== 0) {
      // window.alert("Login SuccessFully ")
      return true;
    } else {
      return false;
    }
  }
  const UpdateAcc = () => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      console.log(accounts, "account changed");
      setAddress(accounts[0]);
    });
  };

  //Connect Metamask Or Login With This Function
  const SignInMetamask = async (e) => {
    // Creating Instance Of Web3
    try {
      e.preventDefault();
      console.log("hello");
      //Check if Metamask is Installed Or Not
      if (window.ethereum) {
        let { ethereum } = window;
        let account = await ethereum.request({ method: "eth_requestAccounts" });
        console.log(account, "acccc");
        //set Account Address of Logged In User
        setAddress(account[0]);

        const proposals = await NewContract.methods.getAllProposals().call();
        console.log(proposals, "proposals");

        let proposalJson = proposals.map((items) => ({
          name: items[0],
          proposalId: items[1],
          totalVotes: items[2],
          logo: items[3],
        }));
        console.log(proposalJson, "proposalJson");
        setParties(proposalJson);
      } else {
        //If Metamask Not Installed Or Not Connected
        window.alert("please connect metamask");
      }
    } catch (error) {
      console.log("Something Wrong ", error.message);
    }
  };

  console.log(parties, "parties after setState");
  console.log(address, "address ");

  //Function for vote to Parties
  async function Vote(e) {
    let proposalId = e.target.id;
    console.log("button click vote", address);
    const votingStatus = await NewContract.methods
      .vote(proposalId, address)
      .send({
        from: address,
        gas: 0x93990,
      });
    console.log(votingStatus, "votng Status");
  }

  async function getResult() {
    try {
      const votingResult = await NewContract.methods.getWinner(address).call();
      console.log(votingResult, "voting result");
      console.log(winner, "winner ");

      // let resultJosn = votingResult?.map((result) => ({
      //   name: result[0],
      //   totalVotes: result[1],
      // }) );
      setWinner({
        name: votingResult[0],
        totalVotes: parseInt(votingResult[1]),
      });
    } catch (error) {
      console.log(error.message, "err catch");
    }
  }

  //---------------------------------------------------------
  return (
    <>
      <Header
        isLogin={isLogin}
        accAddress={address}
        title="Voting System"
      ></Header>

      <Container className="app" style={{ marginTop: "60px" }}>
        {address.length !== 0 ? (
          <Row>
            {parties.map((team, i) => {
              return (
                <Col md={4} key={team.proposalId}>
                  <VotingCard team={team} Vote={Vote}>
                    {" "}
                  </VotingCard>
                </Col>
              );
            })}
          </Row>
        ) : (
          "Please Login"
        )}
      </Container>

      <Web3Modal SignInMetamask={SignInMetamask}> </Web3Modal>
      <Button
        onClick={getResult}
        style={{ marginLeft: "50px", marginTop: "20px" }}
      >
        {" "}
        Get Result
      </Button>
      {winner ? (
        <span style={{ marginLeft: "50px" }}>
          {winner.name} {winner.totalVotes}{" "}
        </span>
      ) : (
        ""
      )}
      {/* <Footer> </Footer> */}
    </>
  );
}

export default App;
