import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';
import RenderRandom from './components/RenderRandom';
import RenderCategories from './components/RenderCategories';
import DetailBreakdown from './components/DetailBreakdown';
import Ingredients from './components/Ingridents';
import IngridentsInfo from './components/IngridentsInfo';
import ReactAudioPlayer from 'react-audio-player';

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
      selectIngredient: [],
      choices: [],
      arr1: [],
      arr2: [],
      final: [],
      finalRender: []
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
    this.filteredIngridents = this.filteredIngridents.bind(this);

  }
  //gets random drink info via axios call
  async generateRandomData() {

    const randoms = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/random.php`);
    this.setState({
      rando: randoms.data.drinks,
      drink: [],
      categoriesBreakdown: [],
      selectIngredient: [],
      visible: '',
      categories: [],
      choices: [],
      arr1: [],
      arr2: [],
      final: [],
      finalRender: []
    })

  }
  //lists all the categories via axios call
  async showCategories() {
    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/list.php?c=list`);

    if (this.state.visible === '') {
      this.setState({
        categories: info.data.drinks,
        drink: [],
        rando: [],
        oneDrink: [],
        categoriesBreakdown: [],
        selectIngredient: [],
        visible: 'a',
        choices: [],
        arr1: [],
        arr2: [],
        final: [],
        finalRender: []
      })

    } else {
      this.setState({
        categories: [],
        drink: [],
        rando: [],
        oneDrink: [],
        categoriesBreakdown: [],
        selectIngredient: [],
        choices: [],
        visible: '',
        arr1: [],
        arr2: [],
        final: [],
        finalRender: []
      })
    }

  }

  //handleChange of ingrident
  changeIngrident(e) {
    this.setState({selectIngredient: e.target.value})
  }

  // reflects each ingrident on the screen, submit of ingrident
  async handleIngridentChange(e) {
    e.preventDefault();

    await this.setState({
      choices: [
        ...this.state.choices,
        this.state.selectIngredient
      ],
      drink: [],
      rando: [],
      categoriesBreakdown: [],
      categories: [],
      visible: ''
    })

    this.loadIngrident(this.state.selectIngredient);
  }

  async loadIngrident(word) {

    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/filter.php?i=${word}`);
    console.log('info of ingrident is ', info.data.drinks)

    if (info.data != false) {

      this.setState({
        arr1: info.data.drinks.map(e => {
          return e.idDrink
        })
      })

      if (this.state.arr2.length <= 0) {
        this.setState({
          arr2: info.data.drinks.map(e => {
            return e.idDrink
          })
        })

        this.setState({
          final: info.data.drinks.map(e => {
            return e.idDrink
          })
        })

      } else if (this.state.arr2.length > 0) {
        let newArr = [];
        this.state.arr1.filter(e => {
          for (let i = 0; i < this.state.arr2.length; i++) {
            if (e === this.state.arr2[i]) {
              newArr.push(e);
            }
          }
        })
        console.log('New Array: ', newArr);
        this.setState({final: newArr})
      }

    } else {

      // alert('That is not considered an ingrident')
    }

    this.state.final.map(e => {
      // console.log(e);
      this.filteredIngridents(e);
    })

  }

  async filteredIngridents(word) {

    this.setState({finalRender: []})

    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/lookup.php?i=${word}`);
    // word.map(e=>{

    this.setState({
      finalRender: [
        ...this.state.finalRender,
        info.data.drinks
      ],
      drink: [],
      rando: [],
      categoriesBreakdown: [],
      categories: [],
      visible: ''
    })
    // console.log('final redner',this.state.finalRender);

  }

  handleChange(e) {

    this.setState({selectDrink: e.target.value})
    this.specialRender(e.target.value);

  }

  async specialRender(word) {

    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/search.php?s=${word}`)

    if (!!info.data.drinks) {

      this.setState({
        drink: info.data.drinks,
        rando: [],
        categoriesBreakdown: [],
        choices: [],
        categories: [],
        visible: '',
        selectIngredient: [],
        arr1: [],
        arr2: [],
        final: [],
        finalRender: []
      })
    } else {
      this.setState({
        drink: [],
        rando: [],
        categoriesBreakdown: [],
        choices: [],
        categories: [],
        visible: '',
        selectIngredient: [],
        arr1: [],
        arr2: [],
        final: [],
        finalRender: []
      })
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
        <input type="text" placeholder="Search by ingredients" value={this.state.selectIngredient} onChange={this.changeIngrident}></input>
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
        <Ingredients ingr={this.state.choices}/>
      </div>

      <IngridentsInfo info={this.state.finalRender} giveMeWord={this.giveMeWord}/>

    </div>)
  }
}

export default App;

// <ReactAudioPlayer
//     src="./images/jazz.mp3"
//     autoPlay
//     controls
//   />
