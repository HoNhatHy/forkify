import View from './View.js';

import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'We could not find that recipe. Please try that again!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" crossorigin alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients
        .map(ing => {
          if (!ing.quantity) return;
          return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${new Fraction(
            ing.quantity
          ).toString()}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
        `;
        })
        .join('')}
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
      `;
  }

  // Below is my coding challenge
  /* renderSearchResults(datas) {
    this._data = datas;
    this._clear();

    this._data.forEach(d => {
      const markup = `
        <li class="preview" style="list-style:none">
          <a class="preview__link preview__link--active" href="#">
            <figure class="preview__fig">
              <img src="${d.imageUrl}" crossorigin alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${d.title}</h4>
              <p class="preview__publisher">${d.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      `;

      document
        .querySelector('.search-results')
        .insertAdjacentHTML('afterbegin', markup);
    });
  }

  addHandlerSearchResults(handler) {
    document
      .querySelector('.search__btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
  } */
  // Above is my coding challenge
}

export default new RecipeView();
