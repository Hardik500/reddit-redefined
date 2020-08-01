//Library functions
import Link from "next/link";
import Router from "next/router";

//API functions
import {
  getUserData,
  getXSubreddit,
  getAboutOfSubreddit,
  hidePost,
  refreshAccessToken,
  votePost,
} from "../utils/api";

//Components
import Navbar from "../components/navbar";
import Main from "../components/main";

//Helper functions
import {
  filterPosts,
  getCookie,
  getLocal,
  getLatest,
  isEmptyObject,
  setCookie,
  setLocal,
  reducePost,
} from "../utils/helper";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Home",
      category: "best",
      access_token: null,
      refresh_token: null,
      isLoggedIn: false,
      post_data: [],
      noPostLeft: false,
      user_data: null,
      subreddit: {},
      after: null,
      vote: 0,
    };
  }

  componentDidMount() {
    /* Yay 🎉, we got the data */
    if (
      !isEmptyObject(this.props) &&
      !this.state.isLoggedIn &&
      this.props.refresh_token != undefined
    ) {
      //Set the respective cookie values
      setCookie("access_token", this.props.access_token);
      setCookie("refresh_token", this.props.refresh_token);
      setCookie("refresh_time", this.props.refresh_time);

      //Reroute page to / url
      Router.push("/");
    }

    //Access token got updated
    if (
      this.props.access_token != this.state.access_token ??
      getCookie("access_token")
    ) {
      setCookie("access_token", this.props.access_token);
    }

    /* Access token is present in the cookies */

    if (getCookie("refresh_token") ?? undefined) {
      this.setState({
        access_token: getCookie("access_token"),
        refresh_token: getCookie("refresh_token"),
        isLoggedIn: true,
      });

      /* Intially compare time of now and the next refresh_time */
      this.updateToken();

      /* Initially load the data for the app */
      this.loadInitialDate();

      /* Start the counter for the next time comparison */
      setInterval(this.updateToken, 1000 * 60 * 25);
    }
  }

  loadInitialDate = async () => {
    /* Get the subreddit data from the local storage */
    this.setState({
      subreddit: JSON.parse(getLocal("subredditData")) ?? {},
      selected: JSON.parse(getLocal("subreddit_selected")) ?? "Home",
      category: JSON.parse(getLocal("category_selected")) ?? "best",
    });
    
    /* Initial load the data from the subreddit */
    await getXSubreddit(
      this.state.access_token ?? getCookie("access_token"),
      JSON.parse(getLocal("subreddit_selected")) ?? "Home",
      JSON.parse(getLocal("category_selected")) ?? "best"
    )
      .then(({ data }) => {
        let filtered = filterPosts(data.children);

        this.setState({
          post_data: filtered,
          after: getLatest("t3", data.children),
        });

        if (filtered.length < 5) {
          this.getNewData();
        }

        if (filtered.length) {
          this.setSubRedditData(filtered[0].data.subreddit);
        }
      })
      .catch((err) => {
        console.log(err);
        Router.push("/login");
      });

    /* Get the current user information */
    await getUserData(this.state.access_token ?? getCookie("access_token"))
      .then((data) => {
        this.setState({
          user_data: data,
        });
      })
      .catch((err) => {
        Router.push("/login");
      });
  };

  updateToken = async () => {
    const data = await refreshAccessToken(getCookie("refresh_token"));
    const newDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    setCookie("access_token", data.access_token);
    setCookie("refresh_time", newDate);
    this.setState({
      access_token: data.access_token,
    });
  };

  /* Set the relative information of each subreddit in an object */
  setSubRedditData = async (subreddit) => {
    getAboutOfSubreddit(
      this.state.access_token ?? getCookie("access_token"),
      subreddit
    ).then(({ data }) => {
      this.setState((prevState) => ({
        subreddit: {
          // object that we want to update
          ...prevState.subreddit, // keep all other key-value pairs
          [subreddit]: data, // update the value of specific key
        },
      }));
    });

    setLocal("subredditData", JSON.stringify(this.state.subreddit));
  };

  /* Run the function to get the latest data after the last post */

  getNewData = async (
    selected = this.state.selected,
    category = this.state.category,
    after = this.state.after
  ) => {
    getXSubreddit(
      this.state.access_token ?? getCookie("access_token"),
      selected,
      category,
      after
    ).then(({ data }) => {
      if (data?.children.length) {
        //Set the id of the last post
        this.setState({
          after: getLatest("t3", data.children),
        });

        //Remove voted posts
        let filtered = filterPosts(data.children);

        //If we have data in filtered then only destructure it
        if (filtered.length) {
          this.setState({
            post_data: [...this.state.post_data, ...filtered],
          });
        }

        // Fetch new data if filtered array is smaller
        if (filtered.length < 5) {
          this.getNewData();
        }
      } else {
        this.setState({
          noPostLeft: true,
        });
      }
    });
  };

  /* Remove the first post */

  getNextPost = async (vote, id) => {
    if (vote) {
      await votePost(this.state.access_token, vote, "t3_" + id);
    } else {
      await hidePost(this.state.access_token, "t3_" + id);
    }

    //Check if key already exists in the state
    if (!this.state.subreddit[this.state.post_data[1]?.data.subreddit]) {
      this.setSubRedditData(this.state.post_data[1]?.data.subreddit);
    }

    //Remove the first value of array
    this.setState({ post_data: reducePost(this.state.post_data) });

    /*
      If the no of posts viewed is less than 5,
      then fetch new data
    */
    if (this.state.post_data.length <= 5) {
      await this.getNewData();
    }
  };

  setSelectedSub = async (
    subName = this.state.selected,
    category = this.state.category
  ) => {
    setLocal("subreddit_selected", JSON.stringify(subName));

    this.setState({
      selected: subName,
      category: category,
      post_data: [],
      after: [],
    });
    //Fetch new data of the subreddit if not global
    if (subName != "Popular" && subName != "All" && subName != "Home") {
      await this.setSubRedditData(subName);
    }
    await this.getNewData(subName, category, null);
  };

  render() {
    /* No query is passed in the url and the user is not logged in */
    if (isEmptyObject(this.props.query) && !this.state.isLoggedIn) {
      return (
        <Link href="/login">
          <a>Please Login</a>
        </Link>
      );
    }

    /* The user is logged in */
    if (this.state.isLoggedIn) {
      const {
        author,
        created_utc,
        id,
        media,
        post_hint,
        preview,
        permalink,
        secure_media_embed,
        selftext_html,
        subreddit,
        subreddit_name_prefixed,
        title,
        thumbnail,
        url,
        ups,
      } = this.state.post_data[0]?.data ?? [];

      const { reddit_video } = media ?? {};

      //Get the icon of the subreddit
      const community_icon =
        this.state.subreddit[subreddit]?.community_icon ?? undefined;
      const sub_icon_img = this.state.subreddit[subreddit]?.icon_img ?? undefined;

      const primary_color = this.state.subreddit[subreddit]?.primary_color ?? undefined;

      //Ge the info of current user
      const { name, link_karma, comment_karma, icon_img } =
        this.state.user_data ?? [];

      if (this.state.post_data.length) {
        return (
          <>
            <Navbar
              subreddit_title={subreddit_name_prefixed}
              subreddit_logo={sub_icon_img}
              community_icon={community_icon}
              primary_color={primary_color}
              post_user={author}
              post_date={created_utc}
              current_username={name}
              selected={this.state.selected}
              setSelectedSub={this.setSelectedSub}
              current_user_karma={link_karma + comment_karma}
              current_user_profile={icon_img}
            ></Navbar>
            <Main
              id={id}
              title={title}
              type={post_hint}
              selftext_html={selftext_html}
              url={url}
              preview={preview}
              permalink={permalink}
              thumbnail={thumbnail}
              selected={this.state.selected}
              setSelectedSub={this.setSelectedSub}
              media={reddit_video}
              iframe={secure_media_embed?.content}
              nextPost={this.getNextPost}
              upvotes={ups}
              userSubs={JSON.parse(getLocal("personalSubs")) ?? []}
              favSubs={JSON.parse(getLocal("favoriteSubs")) ?? []}
            ></Main>
          </>
        );
      } else {
        return (
          <>
            <Navbar
              subreddit_title={subreddit_name_prefixed}
              subreddit_logo={sub_icon_img}
              community_icon={community_icon}
              post_user={author}
              post_date={created_utc ?? Date.now() / 1000}
              current_username={name}
              current_user_karma={link_karma + comment_karma}
              current_user_profile={icon_img}
            ></Navbar>
            <Main
              title={title}
              type={post_hint}
              selftext_html={selftext_html}
              url={url}
              preview={preview}
              thumbnail={thumbnail}
              selected={this.state.selected}
              media={reddit_video}
              iframe={secure_media_embed?.content}
              userSubs={JSON.parse(getLocal("personalSubs")) ?? []}
              favSubs={JSON.parse(getLocal("favoriteSubs")) ?? []}
            ></Main>
          </>
        );
      }
    } else if (this.state.noPostLeft) {
      /* If nothing is there show the loader */
      return <div>No posts left</div>;
    } else {
      /* If nothing is there show the loader */
      return <div>Loading...</div>;
    }
  }
}

export default Home;
