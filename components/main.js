import styles from "./main.module.scss";

import UserCommunities from "./user_communities";

import Switcher from "./posts/switcher";

export default function Main({
  title,
  type,
  image_url,
  image_props,
  media,
  iframe,
  nextPost,
}) {
  return (
    <div style={{ display: "flex" }}>
      <UserCommunities />
      <div>
        <button onClick={nextPost}>Next Post</button>
        <h1>{title}</h1>
        <Switcher
          type={type}
          image_url={image_url}
          image_props={image_props}
          media={media}
          iframe={iframe}
        />
      </div>
      <UserCommunities />
    </div>
  );
}
