import axios from 'axios';

// Zach Example: continuous data
export async const getContinuosData = (API_KEY, endpoint, exchange, code, number) => {
  const endpoint = `https://www.quandl.com/api/v3/datasets/${endpoint}/${exchange}_${code}${number}.json?api_key=${API_KEY}`
  try {
    const data = await axios.get(endpoint);
    return data;
  } catch ( err ) {
    console.error(err);
  }
}

// TODO: get BATS data
/**
 * Get data from BATS API. BATS has a free dataset for stock exchange data.
 *
 * Documentation: https://www.quandl.com/data/BATS-BATS-U-S-Stock-Exchanges
 *
 */
export async const getBATSData = () => {

  return data;
}

