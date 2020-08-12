import Layout from "../components/layout";

import Navbar from "../components/login/navbar";
import Main from "../components/login/main";

//Secret code that will be passed in the URL parameter
const code = process.env.secret_code;

const link =
  process.env.reddit_api +
  `/authorize?client_id=${process.env.client_id}&response_type=code&state=${code}&redirect_uri=${process.env.redirect_url}&duration=permanent&scope=identity read mysubreddits vote submit privatemessages report save history`;

export default function Login() {
  return (
    <Layout login>
      <Navbar link={link} />
      <Main link={link}/>
    </Layout>
  );
}
