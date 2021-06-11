import {connectMetaMask} from "../etherum";

import React, { useState } from 'react';

const ConnectButton = (props) => {
    const clickHandler = ()=>{
        connectMetaMask();
    }
    return(
        <button className="btn btn-primary" onClick={clickHandler}>Connect MetaMask</button>
    )
}

export default ConnectButton;