const {redirectPairs} = require('./seo-urls.cjs');

// Keep this history after migrating Sanity. A slashless request is normalized by Next first.
module.exports = redirectPairs.map(({from, to}) => ({
  source: from,
  destination: `https://www.montebiuro.pl${to}`,
  statusCode: 301,
}));
