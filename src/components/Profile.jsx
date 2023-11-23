// Profile.js
import React from "react";

const Profile = ({ currentUser }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {currentUser.username}</p>
      
    </div>
  );
};

export default Profile;
