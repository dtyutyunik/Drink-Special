import React from 'react';

export default function Ingredients(props){

  return(
    props.ingr.map(e=>{
      return <h2 key={e}>{e}</h2>
    })
  )



}
