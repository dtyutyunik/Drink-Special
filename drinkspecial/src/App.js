import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import RenderChoices from './components/RenderChoices';
import RenderRandom from './components/RenderRandom';
import RenderCategories from './components/RenderCategories';
import DetailBreakdown from './components/DetailBreakdown';
import Ingredients from './components/Ingridents';
import IngridentsInfo from './components/IngridentsInfo';

const KEYS = process.env.REACT_APP_DRINKING_API_KEY;
let readable=[];

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
      arr1: [],
      arr2: [],
      final: [],
      finalRedner:[],
      master: []
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

  async generateRandomData() {

    const randoms = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/random.php`);
    this.setState({rando: randoms.data.drinks, drink: [], categoriesBreakdown: [], visible: '', categories: []})

  }

  async showCategories() {
    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/list.php?c=list`);

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

// reflects each ingrident on the screen
  async handleIngridentChange(e) {
    e.preventDefault();

    await this.setState({
      choices: [
        ...this.state.choices,
        this.state.selectIngrident
      ]
    })

    this.loadIngrident(this.state.selectIngrident);
  }



  async loadIngrident(word) {

    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/filter.php?i=${word}`);
    console.log('info of ingrident is ', info.data.drinks)

    if (info.data !== false) {

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
        this.setState({
          final: newArr
        })
      }

    } else {
      alert('not an item to search for')
    }

    this.state.final.map(e => {
      // console.log(e);
      this.filteredIngridents(e);
    })

  }


  async filteredIngridents(word) {


    // console.log('final is',this.state.final);


    // console.log('inside filtered', word);
   // word.map(e=>{
    //   let info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/lookup.php?i=${e}`);
    //
    //     this.setState({
    //
    //     finalRedner: e
    //   })
    // })
   //  })
this.setState({
  finalRedner: [],
})
   // choices: [
   //   ...this.state.choices,
   //   this.state.selectIngrident
   // ]
   // let infoING=[];
    // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13060
    const info = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${KEYS}/lookup.php?i=${word}`);
    // word.map(e=>{

      this.setState({

      // finalRedner: info.data.drinks
      finalRedner: [...this.state.finalRedner,info.data.drinks]
    // })
  })
  console.log('final redner',this.state.finalRedner);


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
        <Ingredients ingr={this.state.choices}/>
      </div>

 <IngridentsInfo info={this.state.finalRedner}/>


    </div>)
  }
}

      // <IngridentsInfo info={this.state.finalRedner}/>
export default App;
