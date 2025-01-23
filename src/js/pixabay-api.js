'use strict';

export const searchingData = async (inputValue, axios, numOfPages) => {
  return await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '48259740-4b53b0822f94ea1fa118abb4f',
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: numOfPages,
    },
  });
};
