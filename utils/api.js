import axios from "axios";

//URL for basic oauth requests to reddit
const oauth = process.env.reddit_outh;

//URL for api requests to reddit
const api = process.env.reddit_api;

const generateTempCode = async (code) =>
  await axios
    .post(
      `${api}/access_token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.redirect_url}`,
      null,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.client_id + ":" + process.env.client_secret
            ).toString("base64"),
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);

const refreshAccessToken = async (refresh_token) =>
  await axios
    .post(
      `${api}/access_token?grant_type=refresh_token&refresh_token=${refresh_token}`,
      null,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.client_id + ":" + process.env.client_secret
            ).toString("base64"),
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);

const getUserData = async (token) =>
  await axios
    .get(`${oauth}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getUserSubreddits = async (token, afterId = null) =>
  await axios
    .get(`${oauth}/subreddits/mine/subscriber?limit=10&after=${afterId}&count=10`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getPopularSubereddits = async (token) =>
  await axios
    .get(`${oauth}/subreddits/popular?limit=10`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getRPopular = async (
  token,
  afterId = null,
  category = "hot"
) =>
  await axios
    .get(
      `${oauth}/r/popular/${category}?limit=10&g=GLOBAL&after=${afterId}&count=10`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);

const getBest = async (token, limit = 10, afterId = null, count = 0) =>
  await axios
    .get(`${oauth}/best?limit=${limit}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getUserInformation = async (token, ids) =>
  await axios
    .get(`${oauth}/api/user_data_by_account_ids?ids=${ids}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getAboutOfSubreddit = async (token, subredditName = "technology") =>
  await axios
    .get(`${oauth}/r/${subredditName}/about`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const votePost = async (token, dir, id) =>
  await axios
    .post(`${oauth}/api/vote?dir=${dir}&id=${id}`, null, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);

const hidePost = async (token, id) =>
  await axios
    .post(`${oauth}/api/hide?id=${id}`, null, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);

module.exports = {
  generateTempCode,
  getAboutOfSubreddit,
  getUserInformation,
  getBest,
  getRPopular,
  getPopularSubereddits,
  getUserSubreddits,
  getUserData,
  hidePost,
  refreshAccessToken,
  votePost,
};
