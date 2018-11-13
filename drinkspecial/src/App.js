import React, { Component } from 'react';
import GetData from './services/DataPull';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';
import RenderRandom from './components/RenderRandom';


const KEYS=process.env.REACT_APP_DRINKING_API_KEY;

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      drink: [],
      view: ''
    }

    this.setView=this.setView.bind(this);
    this.getView=this.getView.bind(this);

  }


  setView(screens){
    console.log(screens);

    this.setState({
      view: screens
    })

    switch(screens){
      case 'Random': return this.getView('Random');
    }

  }

  async getView(load){

    switch(load){
      case 'Random':
      const randoms=await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/random.php`);
      console.log(randoms.data);

        this.setState({
          drink: randoms.data.drinks
        })
      // return randoms;
    }


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

        <button>Categories</button>
        <button onClick={()=>this.setView('Random')}>Random</button>
        <input
          type="text"
          placeholder="search for a drink">
        </input>
        <RenderRandom oneDrink={this.state.drink}/>
{/*
      <RenderChoices result={this.state.drink}/>
*/}

      </div>

    );
  }
}

export default App;
