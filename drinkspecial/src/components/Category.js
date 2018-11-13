import React from 'react';

export default function Category(props){
  return(
    props.showInfo.map(e=>{
      return (
        <div>
          {e.strDrink}
          <img src={`${e.strDrinkThumb}`}/>
        </div>
    )
    })
  )
}
