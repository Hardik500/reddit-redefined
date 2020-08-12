import styles from "./navbar.module.scss";

//Components
import SubredditIcon from "../subreddit/subredditIcon";
import Catgory from "./category";

import { formatDistanceToNow } from "date-fns";

export default function Navbar({
  selected,
  setSelectedSub,
  subreddit_title,
  subreddit_logo,
  primary_color,
  post_user,
  post_date,
  current_username,
  current_user_karma,
  current_user_profile,
  community_icon,
}) {
  return (
    <div className={styles.nav}>
      <div className={styles.horz}>
        <div className={styles.app_logo}>
          <a href="/">
            <img src="/images/reddit.png" />
          </a>
        </div>
        <div className={styles.app_heading}>reddit-redefined</div>
      </div>

      <div className={styles.horz}>
        <div className={styles.subreddit_icon}>
          <SubredditIcon community_icon={community_icon} primary_color={primary_color} icon_img={subreddit_logo} />
        </div>
        <div className={styles.post_subreddit}>
          {subreddit_title} &nbsp;&nbsp;
        </div>
        <div className={styles.horz}>
          <div className={styles.user_posted}>
            Posted by u/{post_user} &nbsp;
          </div>
          <div className={styles.time_posted}>
            {formatDistanceToNow(new Date(post_date * 1000))}
          </div>
        </div>
      </div>

      <div className={styles.horz}>
        <div>
          <Catgory selected={selected} setSelectedSub={setSelectedSub}/>
        </div>
        <div className={styles.profile_pic}>
          <img src={current_user_profile} />
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>{current_username}</div>
          <div className={styles.user_karma}>{current_user_karma} Karma</div>
        </div>
        <div className={styles.settings}>
          <img src="/images/settings.png" />
        </div>
      </div>
    </div>
  );
}
