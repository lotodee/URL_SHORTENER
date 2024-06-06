import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw Error('useAuthContext must be inside the scope of AuthContextProvider');
    }
  
    return context
  };