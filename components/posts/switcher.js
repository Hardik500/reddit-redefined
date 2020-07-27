import ImageContainer from "./image_container";
import VideoContainer from "./video_container";
import IframeContainer from "./iframe_container";
import LinkContainer from "./link_container";
import TextContainer from "./text_container";

export default function Switcher({
  type,
  html_text,
  url,
  preview,
  media,
  thumbnail,
  iframe,
}) {
  switch (type) {
    case "image":
      return (
        <ImageContainer
          image_props={preview.images[0].source}
          url={url}
          thumbnail={thumbnail}
        />
      );
    case "hosted:video":
      return <VideoContainer media={media} />;
    case "rich:video":
      return <IframeContainer iframe={iframe} />;
    case "link":
      if (url.search(".gifv") != -1) {
        return <VideoContainer media={preview.reddit_video_preview} />;
      }
      return <LinkContainer url={url} thumbnail={thumbnail} />;
    default:
      return <TextContainer htmlText={html_text} url={url} thumbnail={thumbnail}/>;
  }
}
