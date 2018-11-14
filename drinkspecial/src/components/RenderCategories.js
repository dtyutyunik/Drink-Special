import React from 'react';
import DetailBreakdown from './DetailBreakdown';
import axios from 'axios';




export default function RenderCategories(props){

  return(
      props.categories.map(e=>{
        // return <button onClick={()=>props.showInfo(e.strCategory)} id={e.strCategory} >{e.strCategory} </button>
        return <button onClick={()=>props.showInfo(e.strCategory)}
          id={e.strCategory}
      
          >

            {e.strCategory}
        </button>
    })

  )
}


  //

// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
//
// strDrink: "3-Mile Long Island Iced Tea",
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
// idDrink: "15300"
