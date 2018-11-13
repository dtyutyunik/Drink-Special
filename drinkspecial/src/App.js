import React, { Component } from 'react';
// import GetData from './services/DataPull';
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
      view: '',
      selectDrink: [],
      rando: []
    }

    this.setView=this.setView.bind(this);
    this.getView=this.getView.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.specialRender=this.specialRender.bind(this);

  }



  setView(screens){
    console.log(screens);

    this.setState({
      view: screens
    })

    switch(screens){
      case 'Random': return this.getView('Random');
      default:
    }

  }

  async getView(load){

    switch(load){
      case 'Random':
      const randoms=await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/random.php`);
      console.log(randoms.data);

        this.setState({
          rando: randoms.data.drinks
        })
        default:
      // return randoms;
    }


  }





  //  async componentDidMount(){
  //
  //    const info=await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/search.php?s`);
  //   // const info=await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/list.php?s=a`);
  //   console.log(info.data.drinks);
  //       this.setState({
  //         drink: info.data.drinks,
  //       })
  //
  //   // List the categories, glasses, ingredients or alcoholic filters
  //   // http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
  //   // http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
  //   // http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
  //   // http://www.thecocktaildb.com/api/json/v1/1/list.php?a=list
  //
  //
  // }


    handleChange(e){

        this.setState({
          selectDrink: e.target.value
        })
        console.log('target value is ',e.target.value);
        this.specialRender(e.target.value);

    }

    async specialRender(word){


      console.log('inside special redner ', word)
      const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/search.php?s=${word}`)

      if(!!info.data.drinks){
        console.log(info.data);

        this.setState({
          drink: info.data.drinks
        })
      }else{
        this.setState({
            drink: []
        })

        console.log("bad data")
        // console.log("Data generated is",info.data.drinks[0])
      }


    }



  render() {
    return (
      <div className="App">

        <button>Categories</button>

        <button onClick={()=>this.setView('Random')}>Random</button>

        <input
          type="text"
          placeholder="search for a drink"
          value= {this.state.selectDrink}
          onChange={this.handleChange}
          >
        </input>

        <RenderChoices result={this.state.drink}/>

        {/*<RenderChoices result={(this.state.selectDrink!==null)?this.state.selectDrink:console.log('ohhhhh')}/>*/}
        <RenderRandom oneDrink={this.state.rando}/>

{/*
   <RenderRandom oneDrink={this.state.drink}/>
      <RenderChoices result={this.state.drink}/>
*/}

      </div>

    );
  }
}

export default App;
