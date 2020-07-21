//Library functions
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";

//API functions
import {
  getUserData,
  getUserSubreddits,
  getPopularSubereddits,
  getRPopular,
} from "../utils/api";

//Components
import Layout from "../components/layout";

//Helper functions
import { isEmptyObject, getLatest } from "../utils/helper";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      refresh_token: null,
      isLoggedIn: false,
      data: null,
      after: null,
      counter: 1,
    };
  }

  componentDidMount() {
    /* Yay 🎉, we got the data */
    if (
      !isEmptyObject(this.props) &&
      !this.state.isLoggedIn &&
      this.props.access_token != undefined
    ) {
      //Set the respective cookie values
      document.cookie = `access_token=${this.props.access_token}; path = /`;
      document.cookie = `refresh_token=${this.props.refresh_token}; path = /`;
      document.cookie = `refresh_time = ${this.props.refresh_time}; path = /`;

      //Reroute page to / url
      Router.push("/");
    }

    /* Access token is present in the cookies */

    if (Cookies.get("access_token") ?? undefined) {
      this.setState({
        access_token: Cookies.get("access_token"),
        refresh_token: Cookies.get("refresh_token"),
        isLoggedIn: true,
      });

      /* Initially load the data for the app */

      getRPopular(Cookies.get("access_token")).then(({ data }) => {
        this.setState({
          data: data.children,
          after: getLatest(data.children),
        });
      });
    }
  }

  /* Run the function to get the latest data after the last post */

  getNewData = async () => {
    getRPopular(
      this.state.access_token,
      5,
      this.state.after,
      this.state.counter
    ).then(({ data }) => {
      this.setState({
        data: [...this.state.data, ...data.children],
        after: getLatest(data.children),
      });
    });
  };

  /* Remove the first post and update the counter value */

  getNextPost = async () => {
    this.setState({ counter: this.state.counter + 1 });

    //Remove the first value of array
    let newArr = [...this.state.data];
    newArr.splice(0, 1);
    this.setState({ data: newArr });

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

    if ((this.state.isLoggedIn && this.state.data?.length) || 0) {
      return (
        <Layout home>
          <button onClick={this.getNextPost}>Next Post</button>
          <h1>{this.state.data[0].data.title}</h1>
        </Layout>
      );
    } else {
      /* If nothing is there show the loader */
      return <Layout home>Loading...</Layout>;
    }
  }
}

export default Home;
