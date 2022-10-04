import React from "react";

export const Footer = () => {

  let footerStyle = {
    position: "absolute",
    top: "93.7vh",
    width: "100%"
 
   }
  return (

    <footer className="bg-dark text-light py-1" style={footerStyle}  >
      <p className="text-center">
       Copyright &copy; VotingSystem.com
       </p>
    </footer>
  )
  
};
 