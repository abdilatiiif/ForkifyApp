import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfills async await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    //if we exported the hole class
    // -> const recipeView = new RecipeView(nodel.state.recipe)
  } catch (error) {
    alert(error);
  }
};

controlRecipe();

// listen for the # change event
/*
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', showRecipe);*/

// when you have more than one event fired
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
