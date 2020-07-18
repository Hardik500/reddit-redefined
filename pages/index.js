import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";

import { getUserData } from "../utils/api";
import Layout from "../components/layout";
import { isEmptyObject } from "../utils/helper";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      refresh_token: null,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    if (!isEmptyObject(this.props) && !this.state.isLoggedIn) {
      document.cookie = `access_token=${this.props.access_token}; path = /`;
      document.cookie = `refresh_token=${this.props.refresh_token}; path = /`;
      document.cookie = `refresh_time = ${this.props.refresh_time}; path = /`;

      Router.push("/");
    }
    if (Cookies.get("access_token") != undefined) {
      this.setState({
        access_token: Cookies.get("access_token"),
        refresh_token: Cookies.get("refresh_token"),
        isLoggedIn: true,
      });
    }
  }

  render() {
    if (isEmptyObject(this.props.query) && !this.state.isLoggedIn) {
      return (
        <Link href="/login">
          <a>Please Login</a>
        </Link>
      );
    }

    if (this.state.isLoggedIn) {
      getUserData(this.state.access_token).then((data) => {
        console.log(data);
      })
      return <Layout home>Hello Main Page</Layout>;
    } else {
      return <Layout home>Wait</Layout>;
    }
  }
}

export default Home;
