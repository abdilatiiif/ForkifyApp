import { async } from 'regenerator-runtime';

// the controller.js will take out the recipe out of there
export const state = {
  recipe: {},
};

console.log(state.recipe);



// responsble for fetching recipe data from ipa server
// this function will not return anything, it will only  change the state object
export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}` // insert the id here
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(` error: ${data.message} status: (${data.status} )`);
    }

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
    alert(error);
  }
};
