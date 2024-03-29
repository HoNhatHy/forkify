import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We cannot find any recipes';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(dt => {
        return this._generateMarkupPreview(dt);
      })
      .join('');
  }

  _generateMarkupPreview(result) {
    return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" crossorigin alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                        
                    </div>
                </a>
            </li>
      `;
  }
}

export default new ResultsView();
