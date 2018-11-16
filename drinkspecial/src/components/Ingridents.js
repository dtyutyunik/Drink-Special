import React from 'react';

export default function Ingredients(props){

  return(
    props.ingr.map(e=>{
      return <p key={e}>{e}</p>
    })
  )



}
