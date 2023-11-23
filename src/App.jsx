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
 }
   



  const handlePostBlock = (postId) => {
    
  };

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

  // useEffect(() => {
  //   const numPosts = followingPosts.length;
  //   const freePostsLimit = 20;
  //   setExceededFreeLimit(numPosts > freePostsLimit);
  // }, [followingPosts]);
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
               {/* // <Link to="/my-posts">My Posts</Link> */}
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
          {/* <Route exact path="/payment">
            {exceededFreeLimit ? (
              <Payment onUpgradeToPremium={handlePremiumUpgrade} />
            ) : (
              <Feed
                currentUser={currentUser}
                posts={posts}
                onNewPost={handleCreatePost}
              />
            )} */}

          {/* <Route path="/payment">
            <h2>Premium Membership Payment</h2>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "ATgdXa7jTwdR68hOQwbrx-74_OD3amCCIr1mjc3YL0FoK0WEVR4cDNOAOkt_fOXZLPX2zmVT4AiMUlHM",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "$13.99",
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const name = details.payer.name.given_name;
                  alert("Transaction completed by " + name);
                  setIsPremium(true);
                }}
              />
            </PayPalScriptProvider>
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
