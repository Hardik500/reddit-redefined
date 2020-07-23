//Library functions
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import ReactHtmlParser from "react-html-parser";

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
import UserCommunities from "../components/user_communities";

//Helper functions
import { isEmptyObject, getLatest } from "../utils/helper";

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
      user_subreddit: null,
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
      document.cookie = `access_token=${this.props.access_token}; path = /`;
      document.cookie = `refresh_token=${this.props.refresh_token}; path = /`;
      document.cookie = `refresh_time = ${this.props.refresh_time}; path = /`;

      //Reroute page to / url
      Router.push("/");
    }

    //Access token got updated
    if (
      this.props.access_token != this.state.access_token ??
      Cookies.get("access_token")
    ) {
      document.cookie = `access_token=${this.props.access_token}; path = /`;
    }

    /* Access token is present in the cookies */

    if (Cookies.get("refresh_token") ?? undefined) {
      this.setState({
        access_token: Cookies.get("access_token"),
        refresh_token: Cookies.get("refresh_token"),
        isLoggedIn: true,
      });

      /* Initially load the data for the app */

      getRPopular(Cookies.get("access_token"))
        .then(({ data }) => {
          this.setState({
            post_data: data.children,
            after: getLatest(data.children),
          });
          this.setSubRedditData(data.children[0].data.subreddit);
        })
        .then(() => {
          getUserInformation(
            Cookies.get("access_token"),
            this.state.post_data.map((e) => e.data.author_fullname).toString()
          ).then((data) => {
            this.setState({
              post_user_data: data,
            });
          });
        })
        .catch((err) => {
          Router.push("/login");
        });

      this.setState({
        subreddit: JSON.parse(localStorage.getItem("subredditData")) ?? {},
      });

      getUserData(Cookies.get("access_token"))
        .then((data) => {
          this.setState({
            user_data: data,
          });
        })
        .catch((err) => {
          Router.push("/login");
        });

      getUserSubreddits(Cookies.get("access_token"))
        .then((data) => {
          this.setState({
            user_subreddit: data.data.children,
          });
        })
        .catch((err) => {
          Router.push("/login");
        });
    }
  }

  setSubRedditData = async (subreddit) => {
    getAboutOfSubreddit(Cookies.get("access_token"), subreddit).then(
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

    localStorage.setItem("subredditData", JSON.stringify(this.state.subreddit));
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
          Cookies.get("access_token"),
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

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

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
          <div style={{ display: "flex" }}>
            <UserCommunities user_subreddit={this.state.user_subreddit} />
            <div>
              <button onClick={this.getNextPost}>Next Post</button>
              <h1>{title}</h1>
              {post_hint === "image" && (
                <img src={url} width="460px" height="380px" />
              )}
              {post_hint === "hosted:video" && (
                <video src={media.reddit_video.fallback_url} autoPlay></video>
              )}
              {post_hint === "rich:video" && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.htmlDecode(secure_media_embed.content),
                  }}
                />
              )}
            </div>
            <UserCommunities user_subreddit={this.state.user_subreddit} />
          </div>
        </>
      );
    } else {
      /* If nothing is there show the loader */
      return <div>Loading...</div>;
    }
  }
}

export default Home;
