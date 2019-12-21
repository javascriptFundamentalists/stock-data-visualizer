import axios from "axios";
import * as config from '../../config.json';

const API_KEY = config.default.QUANDL_API_KEY;

// Zach Example: continuous data
//export async const getContinuosData = (API_KEY, endpoint, exchange, code, number) => {
//  const url = `https://www.quandl.com/api/v3/datasets/${endpoint}/${exchange}_${code}${number}.json?api_key=${API_KEY}`
//  try {
//    const data = await axios.get(url);
//    return data;
//  } catch ( err ) {
//    console.error(err);
//  }
//}

/**
 * Get data from WIKI API.
 *
 * Documentation: https://www.quandl.com/data/BATS-BATS-U-S-Stock-Exchanges
 *
 */
export const getBATSData = (code) => {
  const url = `https://www.quandl.com/api/v3/datasets/BATS/${code}.json?api_key=${API_KEY}`;
  const dataPromise = axios.get(url);
  return dataPromise;
};
