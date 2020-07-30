import styles from "./link_container.module.scss";

export default function LinkContainer({ url, thumbnail }) {
  return (
    <div className={styles.container}>
      <a className={styles.url} href={url} target="_blank">{url}</a>
      <br />
      {thumbnail !== "default" && <a href={url} target="_blank"><img src={thumbnail}/></a>}
    </div>
  );
}
