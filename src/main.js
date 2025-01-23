'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchingData } from './js/pixabay-api';
import { errorMessage, dataToImages } from './js/render-functions';

const formInput = document.querySelector('.searchInput');
const formBtn = document.querySelector('.submitBtn');
const mainForm = document.querySelector('.mainForm');
const resultGallery = document.querySelector('.gallery');
const loadingProgress = document.querySelector('.loader');
let inputValue = '';

mainForm.addEventListener('submit', event => {
  event.preventDefault();

  inputValue = formInput.value;

  if (inputValue.trim() === '') {
    iziToast.show({
      message: 'There must be smth!',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topCenter',
      overlayColor: '#b51b1b',
    });
    return;
  } else {
    loadingProgress.classList.remove('visually-hidden');
    searchingData(inputValue)
      .then(array => {
        loadingProgress.classList.add('visually-hidden');

        const { hits } = array;

        if (hits.length === 0) {
          errorMessage(resultGallery, iziToast);
        } else {
          dataToImages(array, resultGallery);
          new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          }).refresh();
        }
      })
      .catch(err =>
        iziToast.show({
          title: 'Sorry!',
          titleColor: '#fafafb',
          message: 'Something went wrong!',
          messageColor: '#fafafb',
          backgroundColor: '#db9e02',
          position: 'center',
          overlayColor: '#996e00',
        })
      );
  }

  mainForm.reset();
});
