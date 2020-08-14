import styles from "./communities.module.scss";

//Components
import SubredditIcon from "../subreddit/subredditIcon";

class Communities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dummy_data: [],
    };
  }

  componentDidMount() {
    let tempArr = [];
    for (let index = 0; index < 15; index++) {
      tempArr.push(
        <div className={styles.horz} key={index}>
          <div
            className={[styles.subreddit_icon_load, styles.load].join(" ")}
          />
          <div
            className={[styles.subbredit_name_load, styles.load].join(" ")}
          />
        </div>
      );
    }

    this.setState({ dummy_data: tempArr });
  }

  render() {
    const {
      user_subreddit,
      title,
      selected,
      setSelectedSub,
      fetched,
    } = this.props;

    return (
      <>
        <div className={styles.heading}>{title}</div>
        <div className={styles.border_white} />
        <div className={styles.container}>
          {user_subreddit.length
            ? user_subreddit?.map(({ data }) => {
                return (
                  <div
                    className={[
                      styles.horz,
                      styles.selection,
                      selected == data.display_name ? styles.selected : "",
                    ].join(" ")}
                    key={data.name}
                    onClick={(e) => setSelectedSub(data.display_name)}
                  >
                    <div className={styles.subreddit_icon}>
                      <SubredditIcon
                        community_icon={data.community_icon}
                        icon_img={data.icon_img}
                        primary_color={data.primary_color}
                      />
                    </div>
                    <div className={styles.subbredit_name}>
                      {data.display_name_prefixed}
                    </div>
                  </div>
                );
              })
            : fetched ? (
                <div>
                  <p>No Subs here</p>
                </div>
              ) : this.state.dummy_data}
        </div>
      </>
    );
  }
}

export default Communities;
