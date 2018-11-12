import React, { Component } from 'react';
import GetData from './services/DataPull';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';


const KEYS=process.env.REACT_APP_DRINKING_API_KEY;

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      drink: [],
      view: ''
    }


  }


  setView(screens){
    console.log(screens)
    this.setState({
      view: screens
    })


  }

  getView(){

  }



   async componentDidMount(){

     const info=await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/search.php?s=margarita`);

        this.setState({
          drink: info.data.drinks,
        })


    // List the categories, glasses, ingredients or alcoholic filters
    // http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
    // http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
    // http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
    // http://www.thecocktaildb.com/api/json/v1/1/list.php?a=list


  }



  render() {
    return (
      <div className="App">

{/*
      <RenderChoices result={this.state.drink}/>
*/}

      </div>

    );
  }
}

export default App;
