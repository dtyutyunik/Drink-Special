import React from 'react';

export default function IngridentsInfo(props){
  return(
    props.info.map(e=>{
      return (<div className='drinkInfo'>
        <div className='breakdown'>
          <p>{e.strDrink}</p>
        </div>

        <img src={`${e.strDrinkThumb}`}/>
        </div>)
    })
  )
}
