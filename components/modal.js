import styles from "./modal.module.scss";

import {clearCookie, clearLocal} from "../utils/helper";

export default function Modal({ show, changeDisplay }) {
  return (
    <div
      className={[styles.container, show ? styles.show : styles.hide].join(" ")}
      onClick={() => changeDisplay(false)}
    >
      <div className={styles.inner_container}>
        <div className={styles.top_bar}>
          <div className={styles.title}>Settings</div>
          <div className={styles.close} onClick={() => changeDisplay(false)}>
            x
          </div>
        </div>
        <div className={styles.settings}>
          <div className={styles.option}>
            <button className={styles.recycle} onClick={() => clearLocal()}>
              <img src="/images/recycle-bin.png" />
              Refresh Database
            </button>
            <p> - Subreddits not displaying correctly, just hit it</p>
          </div>
          <hr />
          <div className={styles.option}>
            <button className={styles.cookie} onClick={() => clearCookie()}>
              <img src="/images/cookie.png" />
              Posts not displaying?
            </button>
            <p> - Clear the respective cookies from your browser</p>
          </div>
          <hr />
          <div className={styles.option}>
            <button className={styles.cross} onClick={() => {clearLocal(false); clearCookie()}}>
              <img src="/images/cross.png" />
              Clear Everything
            </button>
            <p> - Clear any data of this website from your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
}
