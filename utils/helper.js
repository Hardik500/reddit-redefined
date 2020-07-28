const isEmptyObject = (query) => {
  if (query) {
    return Object.entries(query).length == 0;
  }

  return true;
};

const getLatest = (kind = "t3",posts) =>  kind + "_" + posts[posts.length - 1].data.id;

const setCookie = (key, value) => {
  document.cookie = `${key}=${value}; path = /`;
};

const getCookie = (key) => {
  var name = key + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocal = (key) => localStorage.getItem(key);

const htmlDecode = (input) => {
  var e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

const reducePost = (post_data) => {
  let newDataArr = post_data;
  newDataArr.splice(0, 1);
  return newDataArr;
};

const filterPosts = (post_data) => post_data.filter((e) => e.data.likes == null)

const favoriteSub = (post_data) => post_data.filter((e) => e.data.user_has_favorited)

module.exports = {
  favoriteSub,
  filterPosts,
  getCookie,
  getLatest,
  getLocal,
  htmlDecode,
  isEmptyObject,
  reducePost,
  setCookie,
  setLocal,
};
