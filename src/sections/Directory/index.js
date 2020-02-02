import React, { Component } from "react";
import View from "../View/";
import "./style.css";
import octokit from "../../octokit";


function FollowersList(props) {
  const followers = props.followers;
  const listItems = followers.map((follower) => {
    return (
      <li className="user" key={follower.login}>
        <img className="avatar" src={follower.avatar_url} alt="github user avatar"/>
        <span className="username">@{follower.login}</span>
        <View url={follower.url} />
      </li>
    );
  });

  return listItems;
}

class Directory extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {},
      followers: []
    };
  }

  componentDidMount() {
    Promise.all([
      octokit.users.getAuthenticated(),
      // octokit.users.listFollowersForAuthenticatedUser(),
      octokit.users.listFollowingForAuthenticatedUser(),
    ]).then(([user, followers]) => {
      this.setState({
        user: user.data,
        followers: followers.data
      });
    })
  }

  render() {
    const user = this.state.user;
    return (
      <main>
        <h1>Github Users</h1>
        <ul className="users">
          <li className="user" key={user.login}>
            <img className="avatar" src={user.avatar_url} alt="github user avatar"/>
            <span className="username">@{user.login}</span>
            <View userdata={user} />
          </li>
          <FollowersList followers={this.state.followers} />
        </ul>
      </main>
    );
  }
}


export default Directory;