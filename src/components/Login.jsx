import React, { useState } from "react";

const Login = ({ onLogin, users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (users && users.length > 0) {
      const user = users.find(
        (user) =>
          (user.username === username || user.email === username) &&
          user.zipcode === password
      );

      if (user) {
        onLogin(username, password);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("No users found. Please register first.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Zipcode:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
