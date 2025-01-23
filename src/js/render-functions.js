'use strict';

export const errorMessage = (gallery, iziToast) => {
  gallery.innerHTML = '';
  iziToast.show({
    message:
      'Sorry, there are no images matching your search query. Please, try again!',
    messageColor: '#fafafb',
    backgroundColor: '#ef4040',
    image: '../img/error.png',
    imageWidth: 24,
    zindex: 99999,
    position: 'topRight',
    maxWidth: '432px',
    overlayColor: '#b51b1b',
  });
};

export const dataToImages = (hits, gallery) => {
  const arrayOfTags = hits
    .map(
      objectOfImg => `<li class="elementOfGallery">
            <div class="imageOfElement">
              <a
                href="${objectOfImg.largeImageURL}"
                ><img
                  src="${objectOfImg.webformatURL}"
                  alt="${objectOfImg.tags}"
              /></a>
              <div class="infoOfElement">
                <p><span>Likes </span> ${objectOfImg.likes}</p>
                <p><span>Views </span> ${objectOfImg.views}</p>
                <p><span>Comments </span> ${objectOfImg.comments}</p>
                <p><span>Downloads </span> ${objectOfImg.downloads}</p>
              </div>
            </div>
          </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', arrayOfTags);
};
