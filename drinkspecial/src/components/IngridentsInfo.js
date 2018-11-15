import React from 'react';

export default function IngridentsInfo(props){
  return(

    props.info.map(e=>{
      return (<div className='drinkInfo'>
        <div className='breakdown'>
          <p>{e[0].strDrink}</p>
        </div>
        <img src={`${e[0].strDrinkThumb}` } alt={`${e[0].strDrinkThumb}`}/>
        </div>)
    })
  )

}
