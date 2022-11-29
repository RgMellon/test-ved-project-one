module.exports.queryString = obj => {
  return Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
};
