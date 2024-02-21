import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import searchView from './views/searchView.js';
// import 'regenerator-runtime/runtime'; // polyfills async await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    // get the # id
    const id = window.location.hash.slice(1); // get only the id numbers

    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering Recipe

    recipeView.render(model.state.recipe); // render from default class
    //if we exported the hole file
    // -> const recipeView = new RecipeView(nodel.state.recipe)
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1.get query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. load search
    await model.loadSearchResults(query);
    
    // 3.  render load results
    console.log(model.state.search.results);
   
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
