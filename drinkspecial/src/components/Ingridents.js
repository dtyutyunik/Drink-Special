import React from 'react';

export default function Ingredients(props){

  return(
    props.ingr.map(e=>{
      return <h2 className="choiceOfWord" key={e}>{e}</h2>
    })
  )



}
