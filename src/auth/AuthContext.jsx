import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "./auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const signIn = async (username, password) => {
    await auth.signIn(username, password);
    await getCurrentUser();
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    navigate("/");
  };

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
