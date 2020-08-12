import Link from "next/link";

import styles from "./main.module.scss";

export default function Main({ link }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.hero}>
          <div className={styles.div_center}>
            <br />
            <br />
            <div className={[styles.mian_title, styles.div_center].join(" ")}>
              <h1>View Reddit in a new way</h1>
            </div>
            <div className={styles.main_app}>
              <img src="/images/login/main_app.png" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.second} />
      <div className={styles.secondary}>
        <div className={styles.div_center}>
          <div>
            <h1>Purpose of this website</h1>
          </div>
          <div>
            <p>
              To be a simple side-project that gives you next posts only after
              you vote (or hide) a post.
            </p>
            <br />
            <br />
            <div className={styles.ohmygod}>
              <img src="images/login/ohmygod.jpg" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.third} />
      <div className={[styles.tertiary, styles.div_center].join(" ")}>
        <div>
          <h1>Preview of this website</h1>
        </div>
        <div>
          <p>
            So after you login to the website, you will have a screen that will
            look something like this
          </p>
          <br />
          <br />
          <div>
            <div className={styles.iframe_container}>
              <iframe
                className={styles.iframe_main}
                src="https://interactive-img.com/view?id=17304&iframe=true"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forth} />
      <div className={styles.secondary}>
        <div className={styles.div_center}>
          <div>
            <h1>Features of this website</h1>
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
                <a>
                  <button>
                    <div className={styles.sign_in}>
                      <img src="/images/actual-reddit.png" />
                      Sign In With Reddit
                    </div>
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <div>
            <p>
              ( PS: Don't worry your information is not stored anywhere except
              on your device. )
            </p>
          </div>
          <div>
            <div>
              <h1>Still don't believe me?</h1>
            </div>
            <div>
              <p>
                This project is completely Open-Source, so feel free to check it
                out.
              </p>
              <div className={styles.sign_in_cont}>
                <Link href="https://github.com/hardik500" prefetch={false}>
                  <a target="_blank">
                    <button>
                      <div className={styles.sign_in}>
                        <img src="/images/login/GitHub-Mark-120px-plus.png" />
                        Check it on Github
                      </div>
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
