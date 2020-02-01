import React, { Component } from "react";


const config = require("./config");
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: config.PERSONAL_ACCESS_TOKEN
});


function FollowersList(props) {
  const followers = props.followers;
  const listItems = followers.map((follower) => {
    return (
      <li key={follower.login}>
        <img src={follower.avatar_url} alt="github user avatar"/>
        <span>{follower.login}</span>
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
      octokit.users.listFollowersForAuthenticatedUser(),
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
      <ul>
        <li key={user.login}>
          <img src={user.avatar_url} alt="github user avatar"/>
          <span>{user.login}</span>
        </li>
        <FollowersList followers={this.state.followers} />
      </ul>
    );
  }
}


export default Directory;