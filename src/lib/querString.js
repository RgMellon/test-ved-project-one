const keyValueToString = ([key, val]) => {
  if (typeof val == 'object' && !Array.isArray(val)) {
    throw new Error('Please check your params');
  }
  return `${key}=${val}`;
};

module.exports.queryString = obj => {
  return Object.entries(obj).map(keyValueToString).join('&');
};

module.exports.parse = string => {
  return Object.fromEntries(
    string.split('&').map(item => {
      return item.split('=');
    }),
  );
};
