import React, { Component } from 'react';
// import GetData from './services/DataPull';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';
import RenderRandom from './components/RenderRandom';
import RenderCategories from './components/RenderCategories';



const KEYS=process.env.REACT_APP_DRINKING_API_KEY;

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      drink: [],
      view: '',
      selectDrink: [],
      rando: [],
      categories: [],
      visible: '',
      cats:[]
    }

    this.setView=this.setView.bind(this);
    this.getView=this.getView.bind(this);
    this.showCategories=this.showCategories.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.specialRender=this.specialRender.bind(this);
    this.showInfo=this.showInfo.bind(this);

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
          rando: randoms.data.drinks,
          drink: []
        })
        default:
      // return randoms;
    }


  }



async showCategories(){
  const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/list.php?c=list`);
  console.log('inside show categories method ',info.data.drinks);

  if(this.state.visible===''){
    this.setState({
      categories: info.data.drinks,
      visible: 'a'
    })

  }
  else{
    this.setState({
      categories: [],
      visible: ''
    })
  }

}

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
          drink: info.data.drinks,
          rando: []
        })
      }else{
        this.setState({
            drink: [],
            rando: []
        })

        console.log("bad data")
        // console.log("Data generated is",info.data.drinks[0])
      }


    }

     async showInfo(id){
         const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`);
         const moreInfo = info.data.drinks;
         console.log(moreInfo);

         this.setState({
           cat: moreInfo,
         })
         console.log('inside showinfo is ',this.state.cat);
     }



  render() {
    return (
      <div className="App">

        <button onClick={this.showCategories}>Categories</button>

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

        <RenderCategories
          categories={this.state.categories}
          showInfo={this.showInfo}
          individualInfo={this.state.cat}
          />

{/*
   <RenderRandom oneDrink={this.state.drink}/>
      <RenderChoices result={this.state.drink}/>
*/}

      </div>

    );
  }
}

export default App;
