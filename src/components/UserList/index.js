import React from "react";
import View from "../../sections/View/";
import "./style.css";

function UsersList(props) {
  const listItems = props.users.map((user) => {
    return (
      <li className="user" key={user.login}>
        <img className="avatar" src={user.avatar_url} alt="github user avatar"/>
        <span className="username">@{user.login}</span>
        <View userdata={user} />
      </li>
    );
  });

  return listItems;
}


export default UsersList;