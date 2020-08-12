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
    </div>
  );
}
