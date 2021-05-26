import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
// import * as basicLightbox from 'basiclightbox';

import './styles.css';
import imageCardTpl from './tamplates/imageCardTpl.hbs';
import PicturesApiService from './apiService';
import Button from './button';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btn = new Button('.load-more-btn');

searchFormEl.addEventListener('submit', onSearch);
btn.btnEl.addEventListener('click', fatchAndRenderPage);

const picturesApiService = new PicturesApiService();

function onSearch(e) {
  e.preventDefault();
  cleanGallery();
  picturesApiService.resetPage();
  picturesApiService.searchQuery = e.currentTarget.elements.query.value;
  fatchAndRenderPage();
  btn.enable();
}

function cleanGallery() {
  galleryEl.innerHTML = '';
}

function fatchAndRenderPage() {
  picturesApiService
    .fetchImages()
    .then(renderGallery)
    .catch(err =>
      error({
        text: err,
        mode: 'light',
        closer: true,
        hide: true,
        delay: 2000,
      }),
    );
}

function renderGallery({ hits }) {
  if (!hits.length) {
    error({
      text: `enter correct word`,
      mode: 'light',
      closer: true,
      hide: true,
      delay: 2000,
    });
    return;
  }
  const gallery = imageCardTpl(hits);
  galleryEl.insertAdjacentHTML('beforeend', gallery);
  galleryEl.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

  // document.querySelectorAll('.gallery-img').map(el =>
  //   el.addEventListener('click', e => {
  //     const ref = e.target.dataset.ref;
  //     basicLightbox
  //       .create(
  //         `
  //   <img src='${ref}' alt='${1}'>
  //   `,
  //       )
  //       .show();
  //   }),
  // );
}

// galleryEl.addEventListener('click', onClick);
// function onClick(e) {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }
//   const ref = e.target.dataset.ref;
//   const instance = basicLightbox.create(`<img src='${ref}' alt='${1}'>`).show();
// }
