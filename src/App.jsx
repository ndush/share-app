import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Feed from "./components/Feed";
import MyPosts from "./components/MyPosts";
import Following from "./components/Following";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import NavbarComponent from "./components/NavbarComponent";
import "./App.css";
import UserList from "./components/UserList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [freePostCount, setFreePostCount] = useState(20);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [exceededFreeLimit, setExceededFreeLimit] = useState(false);

  useEffect(() => {
    if (followingUsers.length > 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          const friendPosts = data.filter((post) =>
            followingUsers.includes(post.userId)
          );
          setFollowingPosts(friendPosts);
        })
        .catch((error) => {
          console.error("Error fetching following posts:", error);
        });
    }
  }, [followingUsers]);

  const handleRegister = (user) => {
    setUsers([...users, user]);
  };

  const handleLogin = (username, password) => {
    if (users && users.length > 0) {
      const user = users.find(
        (user) =>
          (user.username === username || user.email === username) &&
          user.zipcode === password
      );

      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("No users found. Please register first.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handlePremiumUpgrade = () => {
    setIsPremium(true);
  };

  const handleCreatePost = (newPost) => {
    setUserPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handlePostBlock = (postId) => {};

  const handleFollowUser = (userId) => {
    setFollowingUsers((prevFollowingUsers) => {
      if (prevFollowingUsers.includes(userId)) {
        return prevFollowingUsers.filter((id) => id !== userId);
      } else {
        return [...prevFollowingUsers, userId];
      }
    });
  };

  useEffect(() => {
    if (followingUsers.length > 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          const friendPosts = data.filter((post) =>
            followingUsers.includes(post.userId)
          );
          setFollowingPosts(friendPosts);
        })
        .catch((error) => {
          console.error("Error fetching following posts:", error);
        });
    }
  }, [followingUsers]);

  useEffect(() => {
    const checkFreePostLimit = () => {
      const exceeded = true;
      setExceededFreeLimit(exceeded);
    };
    checkFreePostLimit();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <NavbarComponent
          isAuthenticated={isAuthenticated}
          isPremium={isPremium}
          onLogout={handleLogout}
          onPremiumUpgrade={handlePremiumUpgrade}
        />

        <Switch>
          <Route exact path="/">
            {!isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <>
                <Feed
                  isAuthenticated={isAuthenticated}
                  isPremium={isPremium}
                  freePostCount={freePostCount}
                  onPostBlock={handlePostBlock}
                  currentUser={currentUser}
                  users={users}
                  followingUsers={followingUsers}
                  userPosts={userPosts}
                  posts={exceededFreeLimit ? followingPosts : posts}
                  onFollowUser={handleFollowUser}
                  handleCreatePost={handleCreatePost}
                />
              </>
            )}
          </Route>
          <Route path="/all-users">
            {isAuthenticated ? (
              <UserList
                users={users}
                followingUsers={followingUsers}
                onFollowUser={handleFollowUser}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/my-posts">
            {isAuthenticated ? (
              <MyPosts
                currentUser={currentUser}
                userPosts={userPosts}
                onCreatePost={handleCreatePost}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/following">
            {isAuthenticated ? (
              <Following
                currentUser={currentUser}
                users={users}
                onFollowUser={handleFollowUser}
                followingUsers={followingUsers}
                posts={posts}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/profile">
            {isAuthenticated ? (
              <Profile currentUser={currentUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            {isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={handleLogin} users={users} />
            )}
          </Route>
          <Route path="/register">
            {isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={handleRegister} />
            )}
          </Route>
          {currentUser && (
            <MyPosts
              currentUser={currentUser}
              userPosts={currentUser.userPosts}
              onCreatePost={handleCreatePost}
            />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
