import axios from "axios";
import useSWR from "swr";
import Layout from "../components/layout";
import cookies from 'next-cookies';

import {isEmptyObject} from "../utils/helper";

const fetcher = (link) =>
  axios
    .post(link, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(process.env.client_id + ":" + process.env.client_secret).toString("base64"),
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

const Home = ({ query }) => {
  if(isEmptyObject(query)){
    console.log("Main Page");
  }
  else{
    // const link = process.env.reddit_api + `/access_token?grant_type=authorization_code&code=${query.code}&redirect_uri=${process.env.redirectUri}`;
    // fetcher(link);
    const allCookies = cookies(query);
    console.log(allCookies)
  }
  return (
    <Layout home><button> Get Access Token </button></Layout>
  );
}

Home.getInitialProps = ({query}) => {
  return {query}
}

export default Home;