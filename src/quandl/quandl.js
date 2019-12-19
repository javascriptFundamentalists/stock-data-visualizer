import axios from 'axios';

// sample
export async const getData = (API_KEY, endpoint, exchange, code, number) => {
  const endpoint = `https://www.quandl.com/api/v3/datasets/${endpoint}/${exchange}_${code}${number}.json?api_key=${API_KEY}`
  const data = await axios.get(endpoint);
  return data;
}

