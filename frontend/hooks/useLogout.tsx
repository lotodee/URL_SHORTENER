import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from 'next/navigation'
export const useLogout = () =>{
    const router = useRouter();
const {dispatch} = useAuthContext()
    const logout =()=>{
       

     router.push("/home")
        localStorage.removeItem("user");
       
        dispatch({type:"LOGOUT"})
      
    }

    return{logout}
}

