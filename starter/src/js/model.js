import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON  } from './helpers.js';

// the controller.js will take out the recipe out of there
export const state = {
  recipe: {},
};

console.log(state.recipe);

// responsble for fetching recipe data from ipa server
// this function will not return anything, it will only  change the state object
export const loadRecipe = async function (id) {
  try {

    const data = await getJSON(`${API_URL}/${id}`);


    // get rid of underscores in the object data
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(`${error}🧨🧨`);
  }
};
