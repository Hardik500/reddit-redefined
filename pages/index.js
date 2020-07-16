import axios from "axios";
import Layout from "../components/layout";
import Link from "next/link";
import Router from "next/router";
import useSWR from "swr";

import cookies from "next-cookies";

import { isEmptyObject } from "../utils/helper";

const fetcher = (link) => {
  axios
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
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const fetcher2 = (link, token) => {
  axios
    .get(link, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const Home = (props) => {
  if (isEmptyObject(props.query) && !props?.access_token) {
    return (
      <Link href="/login">
        <a>Please Login</a>
      </Link>
    );
  } else if (!isEmptyObject(props.query) && !props?.access_token) {
    const link =
      process.env.reddit_api +
      `/access_token?grant_type=authorization_code&code=${props.query.code}&redirect_uri=${process.env.redirect_url}`;

    const { data, error } = useSWR(link, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    // const data = fetcher(link);
    document.cookie = `access_token=${data.data.access_token}; path = /`;
    document.cookie = `refresh_token=${data.data.refresh_token}; path = /`;
    Router.push("/");

  } else {
    const link2 = process.env.reddit_outh + `subreddits/mine/subscriber?limit=10`;

    console.log(fetcher2(link2, props.access_token));
    return <Layout home>Hello Main Page</Layout>;
  }
};

export async function getServerSideProps(context) {
  const allCookies = cookies(context);
  return {
    props: {
      access_token: allCookies?.access_token ?? null,
      refresh_token: allCookies?.refresh_token ?? null,
      query: context.query,
    },
  };
}

export default Home;
