import React from "react";
import { Link } from "react-router-dom";

const Following = ({
  currentUser,
  users,
  followingUsers,
  followingPosts,
  posts,
  onFollowUser,
}) => {
  const handleFollowUser = (userId) => {
    onFollowUser(userId);
  };

  // Filter out the current user from the list of users
  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  return (
    <div>
      <h2>Following</h2>
      <p>Welcome, {currentUser.username}!</p>

      <h3>Posts from Friends:</h3>
      {followingPosts && followingPosts.length > 0 ? (
        <ul>
          {followingPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              <p>
                Posted by:{" "}
                {users.find((user) => user.id === post.userId).username}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts from friends yet.</p>
      )}

      <h3>Users You Are Following:</h3>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.username}{" "}
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

export default Following;
