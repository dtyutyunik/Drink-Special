import React from 'react';

function RenderChoices(props){

// <p>Instructions: {e.strInstructions}</p>

// <p>{e.strIngredient {e.strMeasure1}, {e.strIngredient2} {e.strMeasure2}</p>

/*
go through array filter to see if the keys incldues the word, if true then get the value of the corresponding key

*/
let ingredients=[];
let quantity=[];
let overall=[];



  props.result.map(e => {
    for(var i in e){
      // pushes ingredients into array
      if(i.match(/\b(strIngredient)/)){
        ingredients.push(e[i]);
      }
      //pushes quanity into array
      if(i.match(/\b(strMeasure)/)){
        quantity.push(e[i]);
      }
    }


  });

  for(let j=0; j<30; j++){
    console.log(j);
  }









console.log(overall);







return(

  props.result.map(function(e){
    return(
      <div key={e.idDrink} className="drinkInfo">
        <div className='breakdown'>
          <p>Name: {e.strDrink}</p>
          <p>Category: {e.strAlcoholic}</p>

        </div>
          <img src={`${e.strDrinkThumb}`}/>


      </div>

      )
    }
  )
)
}







export default RenderChoices;
