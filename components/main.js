import styles from "./main.module.scss";

import Communities from "./communities";
import Sidebar from "./sidebar";
import Feed from "./feed";
import Switcher from "./posts/switcher";

//API functions
import { getUserSubreddits } from "../utils/api";

//Helper functions
import { getCookie, getLatest, favoriteSub, setLocal } from "../utils/helper";

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

  componentWillUpdate() {
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
      url,
      preview,
      media,
      iframe,
      nextPost,
    } = this.props;

    return (
      <div className={styles.flexContainer}>
        <Sidebar>
          <Feed title="Reddit Feeds" />
          <Communities title="Favorites" user_subreddit={this.state.user_fav} />
        </Sidebar>
        <div className={styles.container}>
          <button onClick={() => nextPost(1, id)}>Upvote</button>
          <button onClick={() => nextPost(-1, id)}>Downvote</button>
          <button onClick={() => nextPost(0, id)}>Hide</button>
          <p>{title}</p>
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
        <Sidebar>
          <Communities
            title="Your Communities"
            user_subreddit={this.state.user_subreddit}
          />
        </Sidebar>
      </div>
    );
  }
}

export default Main;
