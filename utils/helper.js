const isEmptyObject = (query) => {
  if (query) {
    return Object.entries(query).length == 0;
  }

  return true;
};

const getLatest = (posts) => "t3_" + posts[posts.length - 1].data.id;

module.exports = { isEmptyObject, getLatest};
