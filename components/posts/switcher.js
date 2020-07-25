import parse from "html-react-parser";
import ImageContainer from "./image_container";

import { htmlDecode } from "../../utils/helper";

export default function Switcher({
  type,
  image_url,
  image_props,
  media,
  iframe,
}) {
  switch (type) {
    case "image":
      return (
        <ImageContainer
          image_props={image_props.images[0].source}
          url={image_url}
        />
      );
    case "hosted:video":
      return <video src={media} autoPlay></video>;
    case "rich:video":
      return <div>{parse(htmlDecode(iframe))}</div>;
    default:
      return <div></div>;
  }
}
