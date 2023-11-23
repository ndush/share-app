import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
   
    if (username.trim() === "" || zipcode.trim() === "") {
      alert("Please enter a valid username and zip code.");
    } else if (!isValidZipCode(zipcode)) {
      alert("Please enter a valid zip code in the format XXXXX or XXXXX-XXXX.");
    } else {
      
      const newUser = { username, zipcode };
      onRegister(newUser);
      alert("User registered successfully. Please proceed to login.");
      setUsername("");
      setZipcode("");
    }
  };

 
  const isValidZipCode = (zip) => {
    // Regular expression to validate zip code format: XXXXX or XXXXX-XXXX
    const zipCodePattern = /^\d{5}(?:-\d{4})?$/;
    return zipCodePattern.test(zip);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Zip Code (Password):
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
