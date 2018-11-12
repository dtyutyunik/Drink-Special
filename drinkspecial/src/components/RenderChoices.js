import React from 'react';
import DetailBreakdown from './DetailBreakdown';

function RenderChoices(props){

// <p>Instructions: {e.strInstructions}</p>

// <p>{e.strIngredient {e.strMeasure1}, {e.strIngredient2} {e.strMeasure2}</p>

/*
go through array filter to see if the keys incldues the word, if true then get the value of the corresponding key

*/

let ingredients=[];
let nameOfDrink=[];
let quantity=[];
let overall=[];

  // console.log('names are ', nameOfDrink);
  // console.log('ingredients are ',ingredients);
  // console.log('quanity are ',quantity);
  props.result.map(e => {
    for(let i in e){
      // pushes ingredients into array
      if(i.match(/\b(strIngredient)/)){
        if(e[i]!==''){
          // nameOfDrink.push(e.strDrink);
          // ingredients.push(e[i]);
        }
      }
      //pushes quanity into array
      if(i.match(/\b(strMeasure)/)){

        if(e[i]!=="" && e[i]!==" "){
          // quantity.push(e[i]);
        }
      }
    }
  });

  // console.log("nameOfDrink ",nameOfDrink);
  // console.log("ingridents ",ingredients);
  // console.log("quantity ",quantity);
// <DetailBreakdown sendThrough={ingredients}/>

return(

 props.result.map(function(e){
   {/*
    console.log('this is obj', e)

    for( let i in e){

      if(i.match(/\b(strIngredient)/)){
        if(e[i]!==''){

          ingredients.push(e[i])
          console.log("ing "+e[i]);
        }
      }

      if(i.match(/\b(strMeasure)/)){

        if(e[i]!=="" && e[i]!==" "){
          console.log("quant "+e[i]);

        }
      }
    }

*/}


    return(
      <div key={e.idDrink} className="drinkInfo">
        <div className='breakdown'>



          <p>Name: {e.strDrink}</p>
          <p>Alcohol?: {e.strAlcoholic}</p>
          <p>Instructions: {e.strInstructions}</p>
            <p>Category: {e.strCategory}</p>
            <p>Served in: {e.strGlass}</p>
      {/*    <p>{e.strIngredient1} {e.strMeasure1}, {e.strIngredient2} {e.strMeasure2}</p>
    */}
        </div>


          <img src={`${e.strDrinkThumb}`}/>
      </div>

      )
    }



  )


)




}







export default RenderChoices;
