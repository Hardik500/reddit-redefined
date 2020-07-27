import styles from "./main.module.scss";

import UserCommunities from "./user_communities";

import Switcher from "./posts/switcher";

export default function Main({
  id,
  title,
  type,
  selftext_html,
  thumbnail,
  url,
  preview,
  media,
  iframe,
  nextPost,
}) {
  return (
    <div className={styles.flexContainer}>
      <UserCommunities />
      <div className={styles.container}>
        <button onClick={() => nextPost(1, id)}>Upvote</button>
        <button onClick={() => nextPost(-1, id)}>Downvote</button>
        <button onClick={() => nextPost(0, id)}>Hide</button>
        <p>{title}</p>
        <div className={styles.posts}>
        <Switcher
          type={type}
          html_text={selftext_html}
          url={url}
          preview={preview}
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
