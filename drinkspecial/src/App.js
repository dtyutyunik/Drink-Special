import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';
import RenderRandom from './components/RenderRandom';
import RenderCategories from './components/RenderCategories';
import DetailBreakdown from './components/DetailBreakdown';
import Ingredientsa from './components/Ingridents';
import IngridentsInfo from './components/IngridentsInfo';

const KEYS = process.env.REACT_APP_DRINKING_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drink: [],
      selectDrink: [],
      rando: [],
      categories: [],
      visible: '',
      categoriesBreakdown: [],
      oneDrink: [],
      selectIngrident: [],
      choices: [],
      test: [],
      extended: [],
      arr1:[],
      arr2:[],
      final:[]
    }

    this.generateRandomData = this.generateRandomData.bind(this);
    this.changeIngrident = this.changeIngrident.bind(this);
    this.handleIngridentChange = this.handleIngridentChange.bind(this);
    this.showCategories = this.showCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.specialRender = this.specialRender.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.giveMeWord = this.giveMeWord.bind(this);
    this.oneDrinkInfo = this.oneDrinkInfo.bind(this);
    this.loadIngrident = this.loadIngrident.bind(this);

  }

  async generateRandomData() {

    const randoms = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/random.php`);
    this.setState({rando: randoms.data.drinks, drink: [], categoriesBreakdown: [], visible: '', categories: []})

  }

  async showCategories() {
    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/list.php?c=list`);

    //
    if (this.state.visible === '') {
      this.setState({
        categories: info.data.drinks,
        drink: [],
        rando: [],
        oneDrink: [],
        categoriesBreakdown: [],
        visible: 'a'
      })

    } else {
      this.setState({
        categories: [],
        drink: [],
        rando: [],
        oneDrink: [],
        categoriesBreakdown: [],
        visible: ''
      })
    }

  }

  changeIngrident(e) {

    this.setState({selectIngrident: e.target.value})

  }

  async handleIngridentChange(e) {
    e.preventDefault();

    // console.log('sleect Ingredient', this.state.selectIngrident)
    // console.log('handle ingr is', this.state.selectIngrident);

    // await this.setState({
    //   choices: this.state.selectIngrident
    // })

    await this.setState({
      choices: [
        ...this.state.choices,
        this.state.selectIngrident
      ]
    })

    // this.loadIngrident(this.state.choices);
    this.loadIngrident(this.state.selectIngrident);
  }



  async loadIngrident(word) {

    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/filter.php?i=${word}`);
    // console.log( "possible drink choices are ",info.data.drinks);

    let master = [];


    //arr1 holds the ids of the test

      this.setState({
        arr1: info.data.drinks.map(e=>{
          return e.idDrink
        })
      })

      if(this.state.arr2.length<=0){
        this.setState({
          arr2: info.data.drinks.map(e=>{
          return e.idDrink
        })})

          this.setState({
            final: info.data.drinks.map(e=>{
              return e.idDrink
            })
          })

      }else if(this.state.arr2.length>0){
        let newArr = [];
        this.state.arr1.filter(e => {
          for(let i = 0; i< this.state.arr2.length; i++) {
            if(e === this.state.arr2[i]) {
              newArr.push(e);
            }
          }
        })
        console.log('New Array: ', newArr);
        this.setState({
          final: newArr
        })

      }
/*        // const final = this.state.final;
        // for(let i = 0; i<final.length; i++) {
          // this.state.arr2.map
        // }
          // console.log("i is", i);
          this.state.arr2.map(e=>{
            // console.log('e is', e)
            if(i===e){
            return master.push[i];
              // this.setState((state) => ({final: [...state.final, i]}))
              // console.log("match at", i);
            }

            // return i===e
          })
        })
        this.setState({
          final: master
        })
      }
*/
/*
        for(let i=0;i<this.state.arr1.length-1;i++){
          for(let j=0;j<this.state.arr2.length-1;j++){
            if(this.state.arr1[i]===this.state.arr2[j]){
              console.log('match is',this.state.arr1[i])

              this.setState({
                final: [this.state.final,...this.state.arr1[i]]
              })
              // this.setState({
              //   final: this.state.arr2[i]
              // })

            }

          }
        }
*/
    console.log('arr1 after data gather is', this.state.arr1);
    console.log('arr2 after data gather is', this.state.arr2);
    console.log('final after data gather is', this.state.final);



  }


handleChange(e) {

  this.setState({selectDrink: e.target.value})
  this.specialRender(e.target.value);

}

async specialRender(word) {

  const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/search.php?s=${word}`)

  if (!!info.data.drinks) {

    this.setState({drink: info.data.drinks, rando: [], categoriesBreakdown: [], visible: ''})
  } else {
    this.setState({drink: [], rando: [], categoriesBreakdown: [], visible: ''})
  }

}

async showInfo(id) {
  const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`);

  const moreInfo = info.data.drinks;

  this.setState({categoriesBreakdown: moreInfo})

}

giveMeWord(e) {
  this.oneDrinkInfo(e.target.id);

}

async oneDrinkInfo(word) {
  const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${word}`);

  this.setState({oneDrink: info.data.drinks})

}

render() {
  return (<div className="App">
    <h1>Cocktail Creator</h1>

    <form onSubmit={this.handleIngridentChange}>
      <input type="text" placeholder="Search by ingredients" value={this.state.selectIngrident} onChange={this.changeIngrident}></input>
      <input type="submit" value="Add Ingredient"></input>
    </form>

    <button onClick={this.showCategories}>Categories</button>
    <button onClick={() => this.generateRandomData()}>Random</button>

    <input type="text" placeholder="Search drink by Name" value={this.state.selectDrink} onChange={this.handleChange}></input>

    <div>
      <RenderChoices result={this.state.drink}/>
      <RenderRandom oneDrink={this.state.rando}/>
      <RenderCategories categories={this.state.categories} showInfo={this.showInfo}/>
      <DetailBreakdown info={this.state.categoriesBreakdown} giveMeWord={this.giveMeWord} drinkDetail={this.state.oneDrink}/>
    </div>

    <div>
      <Ingredientsa ingr={this.state.choices}/>
    </div>
    {/*<IngridentsInfo info={this.state.test}/>
          */
    }
  </div>)
}
}

export default App;
