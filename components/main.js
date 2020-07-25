import styles from "./main.module.scss";

import UserCommunities from "./user_communities";

import Switcher from "./posts/switcher";

export default function Main({
  title,
  type,
  selftext_html,
  thumbnail,
  url,
  image_props,
  media,
  iframe,
  nextPost,
}) {
  return (
    <div className={styles.flexContainer}>
      <UserCommunities />
      <div className={styles.container}>
        <button onClick={nextPost}>Next Post</button>
        <p>{title}</p>
        <div className={styles.posts}>
        <Switcher
          type={type}
          html_text={selftext_html}
          url={url}
          image_props={image_props}
          media={media}
          thumbnail={thumbnail}
          iframe={iframe}
        />
        </div>
      </div>
      <UserCommunities />
    </div>
  );
}
