import styles from "./communities.module.scss";

export default function Feed({ title, selected, setSelectedSub }) {
  return (
    <>
      <div className={styles.heading}>{title}</div>
      <div className={styles.border_white} />
      <div className={styles.container}>
        <div className={[styles.horz, styles.selection, selected == "Home" ? styles.selected : ""].join(" ")} onClick={(e) => setSelectedSub("Home")}>
          <div className={styles.subreddit_icon}>
            <svg
              className={styles.feed_icons}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15,9.9V8A5,5,0,0,0,5,8V9.9c-2.41.45-4,1.24-4,2.13,0,1.41,4,2.56,9,2.56s9-1.15,9-2.56C19,11.14,17.41,10.35,15,9.9Zm-2,.94a9.62,9.62,0,0,1-3,.39,9.62,9.62,0,0,1-3-.39V8a3,3,0,0,1,6,0Z"></path>
              <path d="M2.74,14.6l3,2.12a7.39,7.39,0,0,0,8.6,0l3-2.12a24.63,24.63,0,0,1-7.26,1A24.63,24.63,0,0,1,2.74,14.6Z"></path>
              <circle cx="16" cy="4" r="4" fill="none"></circle>
              <circle cx="16" cy="4" r="3" fill="none"></circle>
            </svg>
          </div>
          <div className={styles.subbredit_name}>Home</div>
        </div>
        <div className={[styles.horz, styles.selection, selected == "Popular" ? styles.selected : ""].join(" ")} onClick={(e) => setSelectedSub("Popular")}>
          <div className={styles.subreddit_icon}>
            <svg
              className={styles.feed_icons}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon>
            </svg>
          </div>
          <div className={styles.subbredit_name}>Popular</div>
        </div>
        <div className={[styles.horz, styles.selection, selected == "All" ? styles.selected : ""].join(" ")} onClick={(e) => setSelectedSub("All")}>
          <div className={styles.subreddit_icon}>
            <svg
              className={styles.feed_icons}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M1.25,17.5V7.5h5v10Zm11.25,0h-5V5H5l5-5,5,5H12.5Zm1.25,0v-5h5v5Z"></path>
            </svg>
          </div>
          <div className={styles.subbredit_name}>All</div>
        </div>
      </div>
    </>
  );
}
