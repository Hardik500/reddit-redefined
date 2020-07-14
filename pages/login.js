import Head from "next/head";
import Link from "next/link";
import randomize from "randomatic";

const code = randomize('Aa0!', 10);

const link =
  process.env.reddit_api + `/api/v1/authorize?client_id=${process.env.client_id}&response_type=code&state=${code}&redirect_uri=${process.env.redirect_url}&duration=permanent&scope=identity`;

export default function Home() {
  return (
    <>
      <Head>
        <title>reddit: But redefined</title>
      </Head>
      <section>
        <button>
          <Link href={link} prefetch={false}>
            <a>Sign In With Reddit</a>
          </Link>
        </button>
      </section>
    </>
  );
}
