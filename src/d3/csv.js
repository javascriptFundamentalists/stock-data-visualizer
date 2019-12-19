import * as d3 from 'd3';

/**
 * Return a promise of the BATS data
 */
export const readBATSmetadata = (filepath) => {
  // data is assumed to be in public folder next to index.html
  return d3.csv('./data/BATS_metadata.csv');
}
