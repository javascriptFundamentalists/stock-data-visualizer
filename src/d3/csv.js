import * as d3 from 'd3';

/**
 * Return a promise of the BATS data
 */
export const readBATSmetadata = (filepath) => {
  // data is assumed to be in public folder next to index.html
  return d3.csv('./data/BATS_metadata.csv');
}

/**
 * ETL the BATS metadata to extract Exchange
 */
export const batsTransformer = (data) => {
  data.forEach(record => {
    const symParts = record.code.split('_');
    if (symParts.length > 1) {
      record.exchange = symParts[0];
    } else {
      record.exchange = '';
    }
  });
}


/**
 * Return a promise of CHRIS data
 */
export const readCHRISmetadata = (filepath) => {
  // data is assumed to be in public folder next to index.html
  return d3.csv('./data/continuous.csv');
}
