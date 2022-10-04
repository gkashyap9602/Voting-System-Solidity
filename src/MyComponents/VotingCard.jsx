import React from "react";
import { Card, Button } from "react-bootstrap";

export function VotingCard(props) {
  let { team, Vote} = props;
  // console.log(team,"team voting side ")
  return  (
        <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={require(`./assets/${team.logo}`)} />
        <Card.Body style={{ display: "inline-grid" }}>
          <Card.Title style={{ textAlign: "center" }}>{team.name} </Card.Title>

          <Button id ={team.proposalId} onClick={Vote}> Please Vote</Button>
        </Card.Body>
        {/* <Card.Footer> {"footer"}</Card.Footer> */}
      </Card>
    
    </>
  );
}


