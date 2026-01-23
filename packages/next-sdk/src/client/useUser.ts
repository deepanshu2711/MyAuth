import { useContext } from "react";
import { AuthContext } from "./MyAuthProvider.js";

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "Please wrap your application with AuthProvider in order to use useAuth",
    );
  const { user, loading } = context;
  return { user, loading };
};
