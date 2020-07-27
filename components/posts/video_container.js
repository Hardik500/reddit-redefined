import styles from "./video_container.module.scss";

export default function VideoContainer({ media }) {
  const maximum = Math.max(media.height, media.width);
  const minimum = Math.min(media.height, media.width);
  const aspectRatio = (minimum / maximum) * 100;

  return (
    <div
      className={styles.videoContainer}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <video
        className={styles.video}
        src={media.fallback_url}
        autoPlay
        controls
      ></video>
    </div>
  );
}
