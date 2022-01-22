import * as model from './model.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

/* if (module.hot) {
  module.hot.accept();
} */

const controlRecipes = async function () {
  try {
    const id = window.location.hash.replace('#', '');

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2) Render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // Update the recipe servings (in state)
  model.updateServings(6);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlServings();
};

init();

// Below is my coding challenge

/* const loadRecipes = async function () {
  try {
    const query = document.querySelector('.search__field');

    await model.loadSearchResults(query.value);
    const { datas } = model.state2;
    console.log(datas);
    recipeView.renderSearchResults(datas);
  } catch (err) {
    console.log(err);
  }
}; */

/* const loadSearchResults = function () {
  recipeView.addHandlerSearchResults(loadRecipes);
}; */

// loadSearchResults(); This is my coding challenge
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
