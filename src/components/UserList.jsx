import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, followingUsers, onFollowUser }) => {
  const handleFollowUser = (userId) => {
    onFollowUser(userId);
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.username}</Link>{" "}
            <button
              onClick={() => handleFollowUser(user.id)}
              disabled={followingUsers.includes(user.id)}
            >
              {followingUsers.includes(user.id) ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
