import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation'
interface LoginResponse {
  message: string;
}

export const useRegister = () => {
  const router = useRouter()
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const register = async (email: string, password: string,password_confirmation:string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3333/api/auth/register',
        { email, password,password_confirmation }
       
      );

      console.log(response)
      router.push("/login")
      setRegistered(true);
     
    
      setIsLoading(false);
   
     
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
     
    setError(err);
        console.log("the",error?.response?.data)
      } else {
        setError({ message: 'An unknown error occurred' } as AxiosError);
      }
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};