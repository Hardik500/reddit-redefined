import Link from "next/link";

import styles from "./main.module.scss";

export default function Main({ link }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div>
          <h1>Hello there,</h1>
          <div>
            <p>So what exactly is the purpose of this website</p>
          </div>
          <div>
            <p>
              To be a simple side-project that gives you next posts only after
              you vote (or hide) a post.
            </p>
            <div className={styles.div_center}>
              <img src="images/login/ohmygod.jpg" />
            </div>
          </div>
        </div>
        <div>
          <p>Okay so that is enough introduction</p>
          <br />
          <p>Let's explore what it really is,</p>
        </div>
        <div>
          <p>
            So after you login to the website, you will have a screen that will
            look something like this
          </p>
          <br />
          <br />
          <div className={styles.div_center}>
            <div className={styles.iframe_container}>
              <iframe
                className={styles.iframe_main}
                src="https://interactive-img.com/view?id=17304&iframe=true"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1>Let's explore each feature</h1>
          </div>
          <div>
            <div className={styles.feature_container}>
              <div>
                <div className={styles.feature_title}>
                  <h1>Voting</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>Description of Voting</p>
                </div>
              </div>
              <div>
                <div className={styles.feature_preview}>
                  <img src="images/login/Vote.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div>
                <div className={styles.feature_title}>
                  <h1>Subscribed Subs</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>Description of Voting</p>
                </div>
              </div>
              <div>
                <div className={styles.feature_preview}>
                  <img src="images/login/Subscribed.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div>
                <div className={styles.feature_title}>
                  <h1>Hide Post</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>Description of Voting</p>
                </div>
              </div>
              <div>
                <div className={styles.feature_preview}>
                  <img src="images/login/Hide.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div>
                <div className={styles.feature_title}>
                  <h1>Save Post</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>Description of Voting</p>
                </div>
              </div>
              <div>
                <div className={styles.feature_preview}>
                  <img src="images/login/Save.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div>
                <div className={styles.feature_title}>
                  <h1>Open on Reddit</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>Description of Voting</p>
                </div>
              </div>
              <div>
                <div className={styles.feature_preview}>
                  <img src="images/login/OpenOnReddit.gif" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div>
            <h1>So are you ready to sign in now?</h1>
          </div>
          <div className={styles.div_center}>
            <div className={styles.sign_in_cont}>
              <Link href={link} prefetch={false}>
                <button>
                  <div className={styles.sign_in}>
                    <img src="/images/actual-reddit.png" />
                    <a>Sign In With Reddit</a>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
