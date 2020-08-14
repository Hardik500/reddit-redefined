import styles from "./video_container.module.scss";

import ReactPlayer from "react-player";

export default function VideoContainer({ media }) {
  return (
    <div className={styles.container}>
      <ReactPlayer
        controls={true}
        playing={true}
        style={{"height": "100%", "maxHeight": "65vh"}}
        url={"https://nameless-taiga-82931.herokuapp.com/" + media.dash_url}
      ></ReactPlayer>
    </div>
  );
}
