import React, { Component } from "react";


const config = require("./config");
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: config.PERSONAL_ACCESS_TOKEN
});


class DirectoryContainer extends Component {
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
    return (
      <p>Empty!!!</p>
    );
  }
}


export default DirectoryContainer;