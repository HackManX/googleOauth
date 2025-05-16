import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    setError("");

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => console.log(res))
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
    signInWithGoogle,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
