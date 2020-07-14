import Link from "next/link";
import Layout from "../components/layout";

const code = "XÆA-12";

const link =
  process.env.reddit_api +
  `/authorize?client_id=${process.env.client_id}&response_type=code&state=${code}&redirect_uri=${process.env.redirect_url}&duration=permanent&scope=identity`;

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
