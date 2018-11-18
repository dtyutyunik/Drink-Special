import React from 'react';

export default function DetailBreakdown(props) {

  return (props.info.map(function(e) {

    return (<div key={e.idDrink} className="drinkInfo" data-value={props.drinkDetail.length > 0
        ? props.drinkDetail[0].idDrink === e.idDrink
        : false
}>
      <div className='breakdown' id={e.idDrink}>

        <h3>{e.strDrink}</h3>

        <div className="newInfo">
          {
            props.drinkDetail.length > 0 && props.drinkDetail[0].idDrink === e.idDrink
              ? props.drinkDetail.map(e => {
                function showIng() {
                  let ingredients = [];
                  let measure = [];
                  for (let i = 1; i < 15; i += 1) {
                    if (e[`strIngredient${i}`]) {
                      ingredients.push(e[`strIngredient${i}`]);
                      measure.push(e[`strMeasure${i}`]);
                    }
                  }
                  return ingredients.map((p, i) => {
                    return (<div key={i}>
                      {p}: {measure[i]}</div>)
                  })
                }

                return (<div key={e.idDrink}>
                  <p>{e.strAlcoholic}</p>
                  <p>Instructions: {e.strInstructions}</p>
                  <p>Served in: {e.strGlass}</p>
                  Ingredients: {showIng()}
                </div>)
              })
              : null
          }

        </div>

      </div>
      <img className="picHover" key={e.idDrink} id={e.idDrink} onMouseEnter={props.giveMeWord} src={`${e.strDrinkThumb}`} alt={`${e.strDrinkThumb}`}/>
    </div>)

  }))
}
