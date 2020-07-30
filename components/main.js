import styles from "./main.module.scss";

import Communities from "./communities";
import Sidebar from "./sidebar";
import Feed from "./feed";
import Switcher from "./posts/switcher";

//API functions
import { getUserSubreddits } from "../utils/api";

//Helper functions
import {
  getCookie,
  getLatest,
  favoriteSub,
  setLocal,
  nFormatter,
} from "../utils/helper";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_subreddit: this.props.userSubs ?? [],
      user_fav: this.props.favSubs ?? [],
      after: null,
      fetched: false,
    };
  }

  componentDidMount() {
    if (!this.props.userSubs.length) {
      this.fetchUserSubreddits();
    }
  }

  fetchUserSubreddits = (after = null) => {
    getUserSubreddits(getCookie("access_token"), after)
      .then(({ data }) => {
        if (data.children.length) {
          if (this.state.user_subreddit.length) {
            this.setState({
              user_subreddit: [...this.state.user_subreddit, ...data.children],
              after: getLatest("t5", data.children),
            });

            if (favoriteSub(data.children).length) {
              this.setState({
                user_fav: [
                  ...this.state.user_fav,
                  ...favoriteSub(data.children),
                ],
              });
            }
          } else {
            this.setState({
              user_subreddit: data.children,
              after: getLatest("t5", data.children),
            });

            if (favoriteSub(data.children).length) {
              this.setState({
                user_fav: favoriteSub(data.children),
              });
            }
          }
        } else {
          this.setState({
            fetched: true,
          });
        }
      })
      .then(() => {
        if (!this.state.fetched) {
          this.fetchUserSubreddits(this.state.after);
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate() {
    setLocal("personalSubs", JSON.stringify(this.state.user_subreddit));
    setLocal("favoriteSubs", JSON.stringify(this.state.user_fav));
  }

  render() {
    const {
      id,
      title,
      type,
      selftext_html,
      thumbnail,
      selected,
      url,
      preview,
      permalink,
      media,
      iframe,
      nextPost,
      setSelectedSub,
      upvotes,
    } = this.props;

    return (
      <div className={styles.flexContainer}>
        <Sidebar>
          <Feed
            title="Reddit Feeds"
            selected={selected}
            setSelectedSub={setSelectedSub}
          />
          <Communities
            title="Favorites"
            user_subreddit={this.state.user_fav}
            selected={selected}
            setSelectedSub={setSelectedSub}
          />
        </Sidebar>
        <div className={styles.container}>
          <div className={styles.parent}>
            {title ? (
              <>
                <div className={styles.div_title}>
                  <p>{title}</p>
                  {thumbnail === "nsfw" ? (<div className={styles.nsfw}><span className={styles.nsfw_text}>nsfw</span></div>) : ""}
                </div>
                <div className={styles.flexContainer}>
                  <div className={styles.div_left_vote}>
                    <svg
                      width="33"
                      height="33"
                      viewBox="0 0 36 36"
                      fill="#818384"
                      onClick={() => nextPost(1, id)}
                      xmlns="http://www.w3.org/2000/svg"
                      className={[styles.upvote, styles.hoverEffect].join(" ")}
                    >
                      <path
                        d="M18 0L33.5885 16.0169H2.41154L18 0Z"
                        fill="inherit"
                      />
                      <rect
                        x="25"
                        y="36"
                        width="14"
                        height="25"
                        transform="rotate(180 25 36)"
                        fill="inherit"
                      />
                    </svg>
                    <p className={styles.upvotes}>{nFormatter(upvotes)}</p>

                    <svg
                      width="33"
                      height="33"
                      viewBox="0 0 32 36"
                      fill="#818384"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => nextPost(-1, id)}
                      className={[styles.downvote, styles.hoverEffect].join(" ")}
                    >
                      <path
                        d="M16 36L0.411546 19.983L31.5885 19.9831L16 36Z"
                        fill="inherit"
                      />
                      <rect x="9" width="14" height="25" fill="inherit" />
                    </svg>
                  </div>
                  <div className={styles.div_posts}>
                    <div className={styles.posts}>
                      <Switcher
                        type={type}
                        html_text={selftext_html}
                        url={url}
                        preview={preview}
                        media={media}
                        thumbnail={thumbnail}
                        iframe={iframe}
                      />
                    </div>
                  </div>
                  <div className={styles.div_right_vote}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 27 27"
                      fill="none"
                      onClick={() => nextPost(0, id)}
                      className={styles.hoverEffect}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="13.5"
                        cy="13.5"
                        r="12"
                        stroke="white"
                        stroke-width="2"
                      />
                      <path
                        d="M22.5 5.5L5 22"
                        stroke="white"
                        stroke-width="2"
                      />
                    </svg>

                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 30 29"
                      fill="none"
                      onClick={() => nextPost(0, id)}
                      className={styles.hoverEffect}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.5 1.5H6C4.07297 1.67722 2.98694 1.90844 1 3.5C4.09652 2.95997 5.05029 3.42714 6 5V28H28.5V1.5Z"
                        stroke="white"
                        stroke-width="2"
                      />
                      <path d="M17.5 6.5V23" stroke="white" stroke-width="2" />
                      <line
                        x1="9"
                        y1="14"
                        x2="25"
                        y2="14"
                        stroke="white"
                        stroke-width="2"
                      />
                    </svg>
                    <a href={`https://reddit.com${permalink}`} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className={styles.hoverEffect}
                      >
                        <g>
                          <circle
                            fill="#FF4500"
                            cx="10"
                            cy="10"
                            r="10"
                          ></circle>
                          <path
                            fill="#FFF"
                            d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.div_comments}>Comments</div>
              </>
            ) : (
              <>
                <div
                  className={[styles.div_title_load, styles.load].join(" ")}
                />
                <div
                  className={[styles.div_post_load, styles.load].join(" ")}
                />
                <div
                  className={[styles.div_title_load, styles.load].join(" ")}
                />
              </>
            )}
          </div>
        </div>
        <Sidebar>
          <Communities
            title="Your Communities"
            user_subreddit={this.state.user_subreddit}
            selected={selected}
            setSelectedSub={setSelectedSub}
          />
        </Sidebar>
      </div>
    );
  }
}

export default Main;
