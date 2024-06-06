import { createContext, useEffect, useReducer } from "react";

interface UserData {
   
    token: string
  }
  export type AuthContextType = {
    user: UserData | null;
    dispatch: React.Dispatch<UserAction>;
  };
  
  interface UserState {
    user: UserData | null 
  }
  
  type UserAction = { type: 'LOGIN'; payload: UserData  } | { type: 'LOGOUT' };
  
  export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          user: null,
        };
      default:
        return state;
    }
  };
  export const AuthContext = createContext<{
    user: UserData | null;
    dispatch: React.Dispatch<UserAction>;
  }>({
    user: null,
    dispatch: () => {},
  });

  export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, {
      user: null,
    });
  
    useEffect(() => {
      const user: UserData | null = JSON.parse(localStorage.getItem('user') || 'null');
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
       
      }
    }, []);
  console.log()
    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };