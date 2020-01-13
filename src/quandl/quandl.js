import axios from "axios";
import * as config from '../../config.json';

const API_KEY = config.default.QUANDL_API_KEY;

/**
 * Get data from BATS API.
 *
 * Documentation: https://www.quandl.com/data/BATS-BATS-U-S-Stock-Exchanges
 *
 */
export const getBATSData = (code, startDate) => {
  const url = `https://www.quandl.com/api/v3/datasets/BATS/${code}.json?start_date=${startDate}&api_key=${API_KEY}`;
  const dataPromise = axios.get(url);
  return dataPromise;
};

/**
 * Get data from continuous futures API.
 *
 * Documentation: https://www.quandl.com/data/CHRIS-Wiki-Continuous-Futures
 *
 */
export const getCHRISData = (code, startDate) => {
  const url = `https://www.quandl.com/api/v3/datasets/CHRIS/${code}.json?start_date=${startDate}&api_key=${API_KEY}`;
  const dataPromise = axios.get(url);
  return dataPromise;
}

