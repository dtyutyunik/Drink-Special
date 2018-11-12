import react from 'react';
import axios from 'axios';

const KEY=process.env.REACT_APP_DRINKING_API_KEY;

export default async function GetData(path){
  const info=await axios.get(`http://www.thecocktaildb.com/api/json/v1/${KEY}/list.php?`);
  console.log(info.data);

  // List the categories, glasses, ingredients or alcoholic filters
  // http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
  // http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
  // http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
  // http://www.thecocktaildb.com/api/json/v1/1/list.php?a=list


}
