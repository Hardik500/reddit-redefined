const { processEnv } = require("next/dist/lib/load-env-config");

module.exports = {
  env: {
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    redirect_url: process.env.redirect_url || "http://localhost:3000/",
    reddit_api: process.env.reddit_api,
    reddit_outh: process.env.reddit_outh,
    secret_code: process.env.secret_code
  },
};
