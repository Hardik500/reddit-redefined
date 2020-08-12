import Link from "next/link";
import styles from "./navbar.module.scss";

export default function Navbar({ link }) {
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
        <div className={styles.sign_in_cont}>
          <button>
            <Link href={link} prefetch={false}>
              <div className={styles.sign_in}>
                <img src="/images/actual-reddit.png" />
                <a>Sign In With Reddit</a>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
