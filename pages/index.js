//Library functions
import Link from "next/link";
import Router from "next/router";

//API functions
import {
  getUserData,
  getUserSubreddits,
  getPopularSubereddits,
  getRPopular,
  getBest,
  getUserInformation,
  getAboutOfSubreddit,
} from "../utils/api";

//Components
import Navbar from "../components/navbar";
import Main from "../components/main";

//Helper functions
import {
  setLocal,
  getLocal,
  setCookie,
  getCookie,
  isEmptyObject,
  getLatest,
} from "../utils/helper";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      refresh_token: null,
      isLoggedIn: false,
      post_data: null,
      post_user_data: null,
      user_data: null,
      subreddit: {},
      after: null,
      counter: 1,
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

      /* Initially load the data for the app */

      this.loadInitialDate();

      getRPopular(getCookie("access_token"))
        .then(({ data }) => {
          this.setState({
            post_data: data.children,
            after: getLatest(data.children),
          });
          this.setSubRedditData(data.children[0].data.subreddit);
        })
        .then(() => {
          getUserInformation(
            getCookie("access_token"),
            this.state.post_data
              .map(({ data }) => data.author_fullname)
              .toString()
          ).then((data) => {
            this.setState({
              post_user_data: data,
            });
          });
        })
        .catch((err) => {
          Router.push("/login");
        });

      getUserData(getCookie("access_token"))
        .then((data) => {
          this.setState({
            user_data: data,
          });
        })
        .catch((err) => {
          Router.push("/login");
        });
    }
  }

  loadInitialDate = () => {
    this.setState({
      subreddit: JSON.parse(getLocal("subredditData")) ?? {},
    });
  }

  setSubRedditData = async (subreddit) => {
    getAboutOfSubreddit(getCookie("access_token"), subreddit).then(
      ({ data }) => {
        this.setState((prevState) => ({
          subreddit: {
            // object that we want to update
            ...prevState.subreddit, // keep all other key-value pairs
            [subreddit]: data, // update the value of specific key
          },
        }));
      }
    );

    setLocal("subredditData", JSON.stringify(this.state.subreddit));
  };

  /* Run the function to get the latest data after the last post */

  getNewData = async () => {
    getRPopular(
      this.state.access_token,
      5,
      this.state.after,
      this.state.counter
    )
      .then(({ data }) => {
        this.setState({
          post_data: [...this.state.post_data, ...data.children],
          after: getLatest(data.children),
        });
      })
      .then(() => {
        //Get the usernames
        getUserInformation(
          getCookie("access_token"),
          this.state.post_data
            .filter(
              (e) =>
                this.state.post_user_data[e.data.author_fullname] == undefined
            )
            .map((e) => e.data.author_fullname)
            .toString()
        ).then((data) => {
          this.setState((prevState) => ({
            post_user_data: {
              // object that we want to update
              ...prevState.post_user_data, // keep all other key-value pairs
              ...data, // update the value of specific key
            },
          }));
        });
      });
  };

  /* Remove the first post and update the counter value */

  getNextPost = async () => {
    this.setState({ counter: this.state.counter + 1 });

    //Check if key already exists in the state
    if (!this.state.subreddit[this.state.post_data[1]?.data.subreddit]) {
      this.setSubRedditData(this.state.post_data[1]?.data.subreddit);
    }

    //Remove the first value of array
    let newDataArr = [...this.state.post_data];
    newDataArr.splice(0, 1);
    this.setState({ post_data: newDataArr });

    /* 
      If the no of posts viewed is equal to 5,
      then fetch new data
    */
    if (this.state.counter % 5 == 0) {
      await this.getNewData();
      this.setState({ counter: 1 });
    }
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

    if ((this.state.isLoggedIn && this.state.post_data?.length) || 0) {
      const {
        subreddit,
        subreddit_name_prefixed,
        title,
        created_utc,
        author_fullname,
        post_hint,
        media,
        secure_media_embed,
        url,
        preview
      } = this.state.post_data[0].data;

      //Get the icon of the subreddit
      const sub_icon_img =
        this.state.subreddit[subreddit]?.icon_img ?? undefined;

      //Ge the info of current user
      const { name, link_karma, comment_karma, icon_img } =
        this.state.user_data ?? [];

      //Get the username of post
      const username = this.state.post_user_data?.[author_fullname].name;

      return (
        <>
          <Navbar
            subreddit_title={subreddit_name_prefixed}
            subreddit_logo={sub_icon_img}
            post_user={username}
            post_date={created_utc}
            current_username={name}
            current_user_karma={link_karma + comment_karma}
            current_user_profile={icon_img}
          ></Navbar>
          <Main
            title={title}
            type={post_hint}
            image_url={url}
            image_props={preview}
            media={media?.reddit_video?.fallback_url}
            iframe={secure_media_embed?.content}
            nextPost={this.getNextPost}
          ></Main>
        </>
      );
    } else {
      /* If nothing is there show the loader */
      return <div>Loading...</div>;
    }
  }
}

export default Home;
