import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
