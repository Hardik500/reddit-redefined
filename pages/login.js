import Link from "next/link";
import Layout from "../components/layout";

//Secret code that will be passed in the URL parameter
const code = process.env.secret_code;

const link =
  process.env.reddit_api +
  `/authorize?client_id=${process.env.client_id}&response_type=code&state=${code}&redirect_uri=${process.env.redirect_url}&duration=permanent&scope=identity read mysubreddits vote submit privatemessages`;

export default function Login() {
  return (
    <Layout login>
      <section>
        <button>
          <Link href={link} prefetch={false}>
            <a>Sign In With Reddit</a>
          </Link>
        </button>
      </section>
    </Layout>
  );
}
