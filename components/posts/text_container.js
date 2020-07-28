import styles from "./text_container.module.scss";

import parse from "html-react-parser";
import { htmlDecode } from "../../utils/helper";

import LinkContainer from "./link_container";

export default function TextContainer({ htmlText, url, thumbnail }) {
  return (
    <div className={styles.post_text}>
      {parse(htmlDecode(htmlText))}
      {thumbnail !== "self" && thumbnail !== "nsfw" && (
        <LinkContainer url={url} thumbnail={thumbnail} />
      )}
    </div>
  );
}
