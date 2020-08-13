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
              <div className={styles.feature_section_1}>
                <div className={styles.feature_title}>
                  <h1>Voting</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>
                    Want to view the next post and show your appreciation for
                    the user, just click Upvote or Downvote (Not like anybody is
                    judging except you)
                  </p>
                </div>
              </div>
              <div className={styles.feature_section_2}>
                <div className={styles.feature_preview}>
                  <img src="images/login/Vote.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div className={styles.feature_section_1}>
                <div className={styles.feature_title}>
                  <h1>Subscribed Subs</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>
                    Just want to view posts from a specific subreddit, then you
                    can click on any of the subreddit from the list in the
                    sidebars.
                  </p>
                </div>
              </div>
              <div className={styles.feature_section_2}>
                <div className={styles.feature_preview}>
                  <img src="images/login/Subscribed.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div className={styles.feature_section_1}>
                <div className={styles.feature_title}>
                  <h1>Hide Post</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>
                    Don't want to vote a post but still wanna go to the next
                    post, why not just hide it (Another way to switch to next
                    post without voting).
                  </p>
                </div>
              </div>
              <div className={styles.feature_section_2}>
                <div className={styles.feature_preview}>
                  <img src="images/login/Hide.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div className={styles.feature_section_1}>
                <div className={styles.feature_title}>
                  <h1>Save Post</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>
                    Liked a post way too much that you wanna keep it forever,
                    just click the save button and boom done. (FYI You can view
                    your saved post on the reddit app)
                  </p>
                </div>
              </div>
              <div className={styles.feature_section_2}>
                <div className={styles.feature_preview}>
                  <img src="images/login/Save.gif" />
                </div>
              </div>
            </div>
            <div className={styles.feature_container}>
              <div className={styles.feature_section_1}>
                <div className={styles.feature_title}>
                  <h1>Open on Reddit</h1>
                </div>
                <div className={styles.feature_description}>
                  <p>
                    Want to view comments on a post or want to share it with
                    someone else, just open the post on reddit and do whatever
                    you want to do now.{" "}
                  </p>
                </div>
              </div>
              <div className={styles.feature_section_2}>
                <div className={styles.feature_preview}>
                  <img src="images/login/OpenOnReddit.gif" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className={styles.fifth} />
      <div className={styles.div_center}>
        <div>
          <div>
            <h1>So are you ready to sign in now?</h1>
          </div>
          <div>
            <p>
              ( PS: Don't worry your information is not stored anywhere except
              on your device. )
            </p>
          </div>
          <div>
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
          <br />
          <br />
          <br />
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
                <Link
                  href="https://github.com/Hardik500/reddit-redefined"
                  prefetch={false}
                >
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
      <div className={styles.footer}>
        <div className={styles.div_center}>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by <a href="https://www.github.com/hardik500" target="_blank">Hardik Khandelwal</a>
        </div>
      </div>
    </div>
  );
}
