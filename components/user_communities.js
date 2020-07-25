import styles from "./user_communities.module.scss";

//API functions
import { getUserSubreddits } from "../utils/api";

//Components
import SubredditIcon from "./subreddit/subredditIcon";

//Helper functions
import { getCookie } from "../utils/helper";

class UserCommunities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_subreddit: {},
      subreddits: [],
    };
  }

  componentDidMount() {
    getUserSubreddits(getCookie("access_token"))
      .then(({ data }) => this.setState({ user_subreddit: data.children }))
      .then(() => {
        this.state.user_subreddit?.forEach(({ data }) => {
          let subredit = (
            <div className={styles.horz} key={data.name}>
              <div className={styles.subreddit_icon}>
                <SubredditIcon icon_img={data.icon_img} />
              </div>
              <div>{data.display_name_prefixed}</div>
            </div>
          );

          this.setState({
            subreddits: [...this.state.subreddits, subredit],
          });
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>Your Communities</div>
        <div>{this.state?.subreddits}</div>
      </div>
    );
  }
}

export default UserCommunities;
