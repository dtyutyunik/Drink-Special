import React from 'react';

export default function Ingredientsa(props){

  return(
    props.ingr.map(e=>{
      return <p>{e}</p>
    })
  )



}
