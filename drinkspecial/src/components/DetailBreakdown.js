import React from 'react';

export default function DetailBreakdown(props){
  return(
    <div>{props.moreDetail.map(e=>{
      return <p>e.strDrink</p>
      })}</div>
  )
}
