import React from "react";
import style from "./image_container.module.scss";

export default function ImageContainer({ url, image_props, thumbnail }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const aspectRatio = (image_props.height / image_props.width) * 100;
  const height = 500;
  return (
    <div style={{ paddingBottom: `${aspectRatio}%` }}>
      <img
        className={[style.image, style.thumb]}
        src={thumbnail}
        height={`${height}px`}
        style={{ display: isLoaded ? "none" : "block" }}
      />
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        height={`${height}px`}
        className={[style.image, style.full]}
        style={{ opacity: isLoaded ? 1 : 0 }}
        src={url}
      />
    </div>
  );
}
