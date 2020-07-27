import parse from "html-react-parser";
import ImageContainer from "./image_container";
import VideoContainer from "./video_container";

import { htmlDecode } from "../../utils/helper";

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
        )
    case "hosted:video":
      return ( <VideoContainer media={media}/> )
    case "rich:video":
      return <div>{parse(htmlDecode(iframe))}</div>;
    case "link":
      if(url.search(".gifv") != -1){
        return ( <VideoContainer media={preview.reddit_video_preview}/> )
      }
      return <div><a href={url}>{url}</a><br/><img src={thumbnail}/></div>
    default:
      return <div>{parse(htmlDecode(html_text))}</div>;
  }
}
