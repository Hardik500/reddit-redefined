import styles from "./navbar.module.scss";

export default function Navbar(props) {
  return (
    <div className={styles.nav}>
      <div className={styles.horz}>
        <div className={styles.app_logo}></div>
        <div className={styles.app_heading}>reddit-redefined</div>
      </div>

      <div className={styles.horz}>
        <div className={styles.post_subreddit}>{props.subreddit} &nbsp;&nbsp;</div>
        <div className={styles.horz}>
          <div className={styles.user_posted}>Posted by {props.user} &nbsp;</div>
          <div className={styles.time_posted}>3 Hrs Ago</div>
        </div>
      </div>

      <div className={styles.horz}>
        <div className={styles.profile_pic}></div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>Hardik500</div>
          <div className={styles.user_karma}>999 Karma</div>
        </div>
        <div className={styles.settings}></div>
      </div>
    </div>
  );
}
