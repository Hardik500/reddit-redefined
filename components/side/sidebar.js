import styles from "./sidebar.module.scss";

export default function Sidebar({ children }) {
  return <div className={styles.container}>{children}</div>;
}
