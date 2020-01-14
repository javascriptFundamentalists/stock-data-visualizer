import axios from "axios";
import * as config from "../../config.json";

// need to add this header for cors-anywhere
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const API_KEY = config.default.US_FUNDAMENTALS_API_KEY;
const PROXY = `https://cors-anywhere.herokuapp.com/`;

export const getCompaniesData = () => {
  const promise = axios.get(PROXY + `https://api.usfundamentals.com/v1/companies/xbrl?format=json&token=${API_KEY}`);
  return promise;
}

/**
 * Get US Equities fundamentals data
 *
 * @param cik (str) The identifier for the stock
 */
export const getFundamentalsData = (cik) => {
  const promise = axios.get(PROXY + `https://api.usfundamentals.com/v1/indicators/xbrl?companies=${cik}&indicators=Assets,AssetsCurrent,Liabilities,LiabilitiesCurrent&periods=2018&token=${API_KEY}`);
  return promise;
}
