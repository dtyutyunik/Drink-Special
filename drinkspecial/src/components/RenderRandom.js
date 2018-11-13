import React from 'react';

export default function RenderRandom(props){

    return(
      props.oneDrink.map(function(e){
        return(
          <div key={e.idDrink} className="drinkInfo">
            <div className='breakdown'>

              <p>Name: {e.strDrink}</p>
              <p>Alcohol?: {e.strAlcoholic}</p>
              <p>Instructions: {e.strInstructions}</p>
              <p>Category: {e.strCategory}</p>
              <p>Served in: {e.strGlass}</p>
            </div>


              <img src={`${e.strDrinkThumb}`}/>
          </div>
        )
      }
    )
  )


}
