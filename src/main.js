'use strict';

import axios from 'axios';

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
const btnAsker = document.querySelector('.btnLoadMore');
let cardOfGallery;
let inputValue = '';
let numOfPages = 1;
let heightOfCard;

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
    btnAsker.classList.add('visually-hidden');
    resultGallery.innerHTML = '';
    numOfPages = 1;
    loadingProgress.classList.remove('visually-hidden');
    searchingData(inputValue, axios, numOfPages)
      .then(array => {
        loadingProgress.classList.add('visually-hidden');
        btnAsker.classList.remove('visually-hidden');

        const { hits } = array.data;

        if (hits.length === 0) {
          errorMessage(resultGallery, iziToast);
          btnAsker.classList.add('visually-hidden');
        } else {
          dataToImages(hits, resultGallery);
          new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          }).refresh();
          if (array.data.totalHits <= numOfPages * 15) {
            btnAsker.classList.add('visually-hidden');
            iziToast.show({
              message:
                'We are sorry, but you have reached the end of search results.',
              messageColor: '#000000',
              backgroundColor: '#1e99e6',
              position: 'center',
              overlayColor: '#004b7a',
            });
          }
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

btnAsker.addEventListener('click', event => {
  event.preventDefault();

  numOfPages += 1;

  cardOfGallery = document.querySelector('.elementOfGallery');
  heightOfCard = 3 * cardOfGallery.getBoundingClientRect().height;

  btnAsker.classList.add('visually-hidden');
  loadingProgress.classList.remove('visually-hidden');
  searchingData(inputValue, axios, numOfPages)
    .then(array => {
      loadingProgress.classList.add('visually-hidden');
      btnAsker.classList.remove('visually-hidden');

      const { hits } = array.data;

      dataToImages(hits, resultGallery);
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      }).refresh();

      setTimeout(() => {
        window.scrollBy({
          top: heightOfCard,
          behavior: 'smooth',
        });
      }, 100);

      if (array.data.totalHits <= numOfPages * 15) {
        btnAsker.classList.add('visually-hidden');
        iziToast.show({
          message:
            'We are sorry, but you have reached the end of search results.',
          messageColor: '#000000',
          backgroundColor: '#1e99e6',
          position: 'center',
          overlayColor: '#004b7a',
        });
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
});
