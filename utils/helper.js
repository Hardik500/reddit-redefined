const isEmptyObject = (query) => {
  if (query) {
    return Object.entries(query).length == 0;
  }

  return true;
};

module.exports = { isEmptyObject };
