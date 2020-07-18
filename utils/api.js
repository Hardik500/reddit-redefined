import axios from "axios";

const oauth = process.env.reddit_outh;
const api = process.env.reddit_api;

const generateTempCode = async (code) =>
    await axios
        .post(`${api}/access_token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.redirect_url}`, null, {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.client_id + ":" + process.env.client_secret
                    ).toString("base64"),
            },
        })
        .then(res => res.data)
        .catch(err => err)

const refreshAccessToken = async (refresh_token) =>
    await axios
        .post(`${api}/access_token?grant_type=refresh_token&refresh_token=${refresh_token}`, null, {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.client_id + ":" + process.env.client_secret
                    ).toString("base64"),
            },
        })
        .then(res => res.data)
        .catch(err => err)

const getUserData = async (token) =>
    await axios
        .get(`${oauth}api/v1/me`, {
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
        .then(res => res.data)
        .catch(err => err);
    
const getUserSubreddits = async (token) =>
    await axios
        .get(`${oauth}subreddits/mine/subscriber?limit=100`, {
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
        .then(res => res.data)
        .catch(err => err);

module.exports = {
    getUserSubreddits,
    getUserData,
    refreshAccessToken,
    generateTempCode
}