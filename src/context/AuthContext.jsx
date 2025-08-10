import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password, rememberMe) => {
    setLoading(true);
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    return setPersistence(auth, persistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    });
  };

  const updateUserData = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    user,
    setUser,
    createUser,
    updateUserData,
    signIn,
    googleSignIn,
    resetPassword,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// const isAdmin = user?.email === "emon.onnorokom@gmail.com";
