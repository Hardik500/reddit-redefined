import React, {useState} from "react";

import {sanitizeURL} from "../../utils/helper";

import styles from "./image_container.module.scss";

export default function ImageContainer({ url, image_props, thumbnail }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.container}>
      <img
        height={`${image_props.height}px`}
        width={`${image_props.width}px`}
        className={[styles.image, styles.thumb].join(" ")}
        src={thumbnail}
        style={{ display: isLoaded ? "none" : "block" }}
      />
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className={[styles.image, styles.full].join(" ")}
        style={{ display: isLoaded ? "block" : "none" }}
        src={sanitizeURL(url)}
      />
    </div>
  );
}
