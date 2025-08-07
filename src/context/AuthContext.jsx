import { createContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

// const isAdmin = user?.email === "emon.onnorokom@gmail.com";
