import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation'
interface LoginResponse {
  message: string;
}

export const useRegister = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const [openModal ,setOpenModal] = useState(false)
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
   
     
      
    } catch (err:any) {
      
     if(err.message === "Request failed with status code 422"){
      setError("This user is registered")
     }
     else 
     setError("Network Error")
     setOpenModal(true)
     setIsLoading(false);
    }
  };

  const resetError = () =>{
    setError("")
  }
  const handleModalClose = () =>{
    setOpenModal(false)
    }
  return { register, isLoading, error ,resetError ,openModal, handleModalClose};
};