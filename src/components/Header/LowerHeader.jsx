import React from 'react'
import {AiOutlineMenu} from "react-icons/ai";
import classes from './Header.module.css';

function LowerHeader() {
  return (
    <div className= {classes.lower_container}>
      
      <ul>
        <li> 
          <AiOutlineMenu />
          <p>All</p> 
          </li>
        <li>Todays Deals</li>
        <li>Consumer Service</li>
        <li>Registory</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader