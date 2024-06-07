import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation'
interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3333/api/auth/login',
        { email, password }
       
      );
      if(response.status === 200){

      
      router.push("/home")
      setLoggedIn(true);
      }
   
      setIsLoading(false);
      localStorage.setItem('user', JSON.stringify(response.data));
    

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: response.data });
     
      
    } catch (err) {
   
      setError("Invalid crendentials")
     
   
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, loggedIn };
};