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

const setLocal = (key, value) => localStorage.setItem(key, value);

const getLocal = (key) => localStorage.getItem(key);

const removeLocal = async (key) => localStorage.removeItem(key);

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

const nFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


const filterPosts = (post_data) => post_data.filter((e) => e.data.likes == null)

const favoriteSub = (post_data) => post_data.filter((e) => e.data.user_has_favorited)

const sanitizeURL = (url) => url.replace(/amp;/g,'');

module.exports = {
  favoriteSub,
  filterPosts,
  getCookie,
  getLatest,
  getLocal,
  htmlDecode,
  isEmptyObject,
  nFormatter,
  reducePost,
  removeLocal,
  sanitizeURL,
  setCookie,
  setLocal,
};
