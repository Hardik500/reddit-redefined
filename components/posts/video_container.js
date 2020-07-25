import styles from "./video_container.module.scss";

export default function VideoContainer({ media }) {
  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        src={media.fallback_url}
        autoPlay
        controls
      ></video>
    </div>
  );
}
