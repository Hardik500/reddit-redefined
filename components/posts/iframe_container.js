import styles from "./iframe_container.module.scss";
import parse from "html-react-parser";

import { htmlDecode } from "../../utils/helper";

export default function IframeContainer({ iframe }) {
  return <div className={styles.container}>{parse(htmlDecode(iframe))}</div>;
}
