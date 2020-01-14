import Unsplash from 'unsplash-js';
import * as config from '../../config.json';

const API_KEY = config.default.UNSPLASH_API_KEY;

export const unsplash = new Unsplash({accessKey: API_KEY});

/**
 * Grab a random image from unsplash based on a query
 *
 *
 */
export const getRandomImage = (queryObj) => {
  const promise1 = unsplash.photos.getRandomPhoto(queryObj);
  return promise1;
}
export const getRandomFinanceImages = (count) => {
  const promise = unsplash.search.photos("finance", 1, count, { orientation: 'portrait' });
  return promise
}



