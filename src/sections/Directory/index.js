import React, { useState, useEffect } from "react";
import UsersList from "../../components/UserList";
import octokit from "../../octokit";
import "./style.css";

function Directory(props) {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    Promise.all([
      octokit.users.getAuthenticated(),
      // octokit.users.listFollowersForAuthenticatedUser(),
      octokit.users.listFollowingForAuthenticatedUser(),
    ]).then(([user, followers]) => {
      const githubUsersData = [user.data].concat(followers.data);
      setUsersData(githubUsersData);
    })
  }, []);

  return (
    <main>
      <h1>Github Users</h1>
      <ul className="users">
        <UsersList users={usersData} />
      </ul>
    </main>
  );
}


export default Directory;