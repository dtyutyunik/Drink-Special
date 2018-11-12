import React from 'react';

export default function DetailBreakdown(props){
  return(
    <div>{props.sendThrough.map(e=>{
        return e
      })}</div>
  )
}
