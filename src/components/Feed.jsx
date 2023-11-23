import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreatePostForm from "./CreatePostForm";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Feed = ({
  isAuthenticated,
  isPremium,
  reePostCount,
  currentUser,
  handleCreatePost,
}) => {
  const [freePostCount, setFreePostCount] = useState(20);
  const [showPaywall, setShowPaywall] = useState(false);
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (newPost) => {
    handleCreatePost(newPost);
    setPosts([...posts, newPost]);
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // const handleCreatePost = (newPost) => {
  //   setPosts([...posts, newPost]);
  // };

  const handlePostView = () => {
    setFreePostCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    if (freePostCount <= 0) {
      setShowPaywall(true);
    }
  }, [freePostCount]);

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h3>Create New Post</h3>
          <CreatePostForm
            onCreatePost={handlePostSubmit}
            currentUser={currentUser}
            handleCreatePost={handleCreatePost}
          />
        </div>
      )}

      <h2>Feed</h2>
      <p>Welcome, {currentUser.username}!</p>

      {showPaywall ? (
        <div>
          <h3>Paywall</h3>
          <p>
            You have exceeded your free post limit. Upgrade to Premium to view
            unlimited posts.
          </p>
          {isAuthenticated ? (
            isPremium ? (
              <p></p>
            ) : (
              <button onClick={() => console.log("Upgrade to Premium")}>
                Upgrade to Premium
              </button>
            )
          ) : (
            <p>
              <Link to="/login">Login</Link> or{" "}
              <Link to="/register">Register</Link> to upgrade to Premium.
            </p>
          )}
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
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {isAuthenticated && (
                <button onClick={handlePostView} disabled={freePostCount <= 0}>
                  ({freePostCount} left)
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
