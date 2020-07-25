const isEmptyObject = (query) => {
  if (query) {
    return Object.entries(query).length == 0;
  }

  return true;
};

const getLatest = (posts) => "t3_" + posts[posts.length - 1].data.id;

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
}

module.exports = {
  htmlDecode,
  setLocal,
  getLocal,
  setCookie,
  getCookie,
  isEmptyObject,
  getLatest,
};
