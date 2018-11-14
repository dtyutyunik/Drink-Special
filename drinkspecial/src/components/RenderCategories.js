import React from 'react';
import Category from './Category';
import axios from 'axios';



// function handleClick(e){
//   console.log(e.target.id);
// }

// async showinfo(){
//     const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
// }



export default function RenderCategories(props){

  return(
      props.categories.map(e=>{
        // return <button onClick={()=>props.showInfo(e.strCategory)} id={e.strCategory} >{e.strCategory} </button>
        return <button
          onClick={()=>props.showInfo(e.strCategory)}
          id={e.strCategory}
          moreDetail={props.individualInfo}

          >
            {e.strCategory}
        </button>
    })
  )
}

// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
//
// strDrink: "3-Mile Long Island Iced Tea",
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
// idDrink: "15300"
