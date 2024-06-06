'use client';
import { AuthContextProvider } from "@/context/AuthContext"; 


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
};