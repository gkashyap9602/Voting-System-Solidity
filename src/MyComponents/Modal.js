import React from "react";
import '../App.css';
import metaImage from "../assets/metamask.webp"

export function Web3Modal(props) {
let {SignInMetamask} = props
    return (
 <>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Connect to a Wallet</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

          <button type="button" onClick = {SignInMetamask} className="btn-meta" data-bs-dismiss="modal">
          
          <span>Metamask</span>
          <img src = {metaImage} className ="img-metamask"alt="" />
          
          </button>

      </div>
  
    </div>
  </div>
</div>
 </>
    
    )}
