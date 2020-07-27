import parse from "html-react-parser";
import { htmlDecode } from "../../utils/helper";

import LinkContainer from "./link_container";

export default function TextContainer({ htmlText, url, thumbnail }) {
  return (
    <div>
      <div>{parse(htmlDecode(htmlText))}</div>
      {thumbnail !== "self" && <LinkContainer url={url} thumbnail={thumbnail}/>}
    </div>
  );
}
