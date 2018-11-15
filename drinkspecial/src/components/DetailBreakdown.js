import React from 'react';

export default function DetailBreakdown(props) {


  return (props.info.map(function(e) {


    return (<div className="drinkInfo">
      <div className='breakdown' id={e.idDrink}>

        <p>{e.strDrink}</p>

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
                    return (<div>{p}
                      : {measure[i]}</div>)
                  })
                }

                return (<div>
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
      <img className="picHover" id={e.idDrink} onMouseEnter={props.giveMeWord} src={`${e.strDrinkThumb}`}/>
    </div>)

  }))
}
