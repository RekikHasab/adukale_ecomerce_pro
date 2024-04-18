import React from "react";
import numeral from 'numeral'

const CurrencyFormat = ({amount}) =>{
  const formattedAmount = numeral(amount).format("0,0.Br")
  return <div>{formattedAmount}</div>
}
export default CurrencyFormat;