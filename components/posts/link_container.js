import styles from "./link_container.module.scss";

export default function LinkContainer({ url, thumbnail }) {
  return (
    <div>
      <a href={url}>{url}</a>
      <br />
      <img src={thumbnail} />
    </div>
  );
}
