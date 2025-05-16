import React, { useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // your firebase config file

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();

  // registerUser function as you provided
  const registerUser = async (email, password, name) => {
    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Update user profile with displayName
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      // Optionally: you can update context or state here if needed

      return userCredential;
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password && name) {
      registerUser(email, password, name)
        .then(() => {
          // You can add success handling here
          console.log("User registered successfully");
        })
        .catch((error) => {
          // Handle errors here
          alert(error.message);
        });
    }
  };

  return (
    <div className="form">
      <h2> New User</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Name" type="text" ref={nameRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
