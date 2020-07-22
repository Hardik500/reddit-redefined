//Load global CSS files which will be loaded by every page
import "../styles/global.scss";

//Library functions
import App from "next/app";
import cookies from "next-cookies";

//API functions
import { generateTempCode, refreshAccessToken } from "../utils/api";

//Helper functions
import { isEmptyObject } from "../utils/helper";

//Components
import Layout from "../components/layout";

//This will be loaded first i.e. before any component
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let allCookies = cookies(ctx);

    /* 
      If the OAuth token is expired, i.e. current time is greater thant that of refresh time
      then refresh our OAuth auth token but making another request
    */
    if (
      allCookies.refresh_token &&
      new Date(allCookies.refresh_time) < new Date()
    ) {
      const data = await refreshAccessToken(allCookies.refresh_token);
      const newDate = new Date(new Date().getTime() + 60 * 60 * 1000);
      pageProps = data;
      pageProps.refresh_time = newDate;
    } else if (!isEmptyObject(ctx.query)) {
    /* 
      If the url paramter is not empty, that is we logged in and sent our first request
      so we have generated our temp code, and need to send it to get the final token
    */
      const data = await generateTempCode(ctx.query.code);
      const newDate = new Date(new Date().getTime() + 60 * 60 * 1000);
      pageProps = data;
      pageProps.refresh_time = newDate;
    }

    return { pageProps };
  }

  render() {
    //Get the pageProps from this.props and send it as props to child components
    const { Component, pageProps } = this.props;

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
