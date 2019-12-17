import axios from 'axios';

// sample
export async const getOPECByDatasetCode = (datasetCode) => {
  const endpoint = `https://www.quandl.com/api/v3/datasets/OPEC/${datasetCode}.json`
  const data = await axios.get(endpoint);
  return data;
}
