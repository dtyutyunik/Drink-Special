import React from 'react';

export default function DetailBreakdown(props){
  return(
    <div>{props.moreDetail.map(e=>{
        {console.log('detail DetailBreakdown  ', e.strDrink)}
      })}</div>
  )
}
