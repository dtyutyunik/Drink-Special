import React from 'react';
import DetailBreakdown from './DetailBreakdown';

function RenderChoices(props){

// <p>Instructions: {e.strInstructions}</p>

// <p>{e.strIngredient {e.strMeasure1}, {e.strIngredient2} {e.strMeasure2}</p>

/*
go through array filter to see if the keys incldues the word, if true then get the value of the corresponding key

*/

// let ingredients=[];
let nameOfDrink=[];
let quantity=[];
let overall=[];

  
  // console.log('ingredients are ',ingredients);
  // console.log('quanity are ',quantity);
  props.result.map(e => {
    for(let i in e){
      // console.log('names are ', e[i]);
      // pushes ingredients into array
      if(i.match(/\b(strIngredient)/)){
        if(e[i]!==''){
          // console.log('ingredients are ',e[i]);
          // nameOfDrink.push(e.strDrink);
          // ingredients.push(e[i]);
        }
      }
      //pushes quanity into array
      if(i.match(/\b(strMeasure)/)){

        if(e[i]!=="" && e[i]!==" "){
          // console.log('quanity are ',e[i]);
          // quantity.push(e[i]);
        }
      }
    }
  });


return(

 props.result.map(function(e){
   function showIng() {
     let ingredients = [];
     let measure = [];
     for(let i = 1; i < 15; i+=1) {
       if(e[`strIngredient${i}`]){
         ingredients.push(e[`strIngredient${i}`]);
         measure.push(e[`strMeasure${i}`]);
       }}
return ingredients.map((p,i) => {
  return (
    <p>{p} : {measure[i]}</p>
  )
})}

    return(
      <div key={e.idDrink} className="drinkInfo">
        <div className='breakdown'>



          <p>Name: {e.strDrink}</p>
          <p>Alcohol?: {e.strAlcoholic}</p>
          <p>Instructions: {e.strInstructions}</p>
            <p>Category: {e.strCategory}</p>
            <p>Served in: {e.strGlass}</p>
            {showIng()}
        </div>


          <img src={`${e.strDrinkThumb}`}/>
      </div>

      )
    }



  )


)




}







export default RenderChoices;
