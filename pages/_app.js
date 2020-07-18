//Load global CSS files which will be loaded by every page
import "../styles/global.css";
import App from "next/app";
import cookies from "next-cookies";

import { generateTempCode, refreshAccessToken } from "../utils/api";
import Layout from "../components/layout";
import { isEmptyObject } from "../utils/helper";

const fetcher = async (link) =>
  await axios
    .post(link, null, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.client_id + ":" + process.env.client_secret
          ).toString("base64"),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let allCookies = cookies(ctx);
    if (allCookies.refresh_token && new Date(allCookies.refresh_time) < new Date()) {
      const data = await refreshAccessToken(allCookies.refresh_token);
      const newDate = new Date(new Date().getTime() + 60 * 60 * 1000);
      pageProps = data;
      pageProps.refresh_time = newDate;
    } else if (!isEmptyObject(ctx.query)) {
      const data = await generateTempCode(ctx.query.code);
      const newDate = new Date(new Date().getTime() + 60 * 60 * 1000);
      pageProps = data;
      pageProps.refresh_time = newDate;
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
