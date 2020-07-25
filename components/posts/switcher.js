import parse from "html-react-parser";
import ImageContainer from "./image_container";
import VideoContainer from "./video_container";

import { htmlDecode } from "../../utils/helper";

export default function Switcher({
  type,
  html_text,
  url,
  image_props,
  media,
  thumbnail,
  iframe,
}) {
  switch (type) {
    case "image":
      return (
        <ImageContainer
          image_props={image_props.images[0].source}
          url={url}
          thumbnail={thumbnail}
        />
        )
    case "hosted:video":
      return ( <VideoContainer media={media}/> )
    case "rich:video":
      return <div>{parse(htmlDecode(iframe))}</div>;
    case "link":
      return <div><a href={url}>{url}</a><br/><img src={thumbnail}/></div>
    default:
      return <div>{parse(htmlDecode(html_text))}</div>;
  }
}
