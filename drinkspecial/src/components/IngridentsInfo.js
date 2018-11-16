import React from 'react';

export default function IngridentsInfo(props){
  return(props.info.map(e=>{
    function showIng() {
      let ingredients = [];
      let measure = [];

      for (let i = 1; i < 15; i += 1) {
        if (e[0][`strIngredient${i}`]) {
          ingredients.push(e[0][`strIngredient${i}`]);
          measure.push(e[0][`strMeasure${i}`]);
        }
      }
      return ingredients.map((p, i) => {
        return (<div key={i}>{p}
          : {measure[i]}</div>)
      })
    }

      return (<div key={e[0].idDrink} className='drinkInfo'>
        <div  className='breakdown'>
          <p>{e[0].strDrink}</p>
            <p>{e[0].strAlcoholic}</p>
            <p>Category: {e[0].strCategory}</p>
            <p>Served in: {e[0].strGlass}</p>
            <p>Instructions: {e[0].strInstructions}</p>
            Ingredients: {showIng()}
        </div>
        <img src={`${e[0].strDrinkThumb}` } alt={`${e[0].strDrinkThumb}`}/>
        </div>)
    })
  )

}
