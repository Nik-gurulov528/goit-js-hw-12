'use strict';

export const searchingData = inputValue => {
  const searchParams = new URLSearchParams({
    key: '48259740-4b53b0822f94ea1fa118abb4f',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(array => {
    if (array.ok === false) {
      throw new Error(array.status);
    } else {
      return array.json();
    }
  });
};
