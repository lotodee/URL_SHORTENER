
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { user } = useAuthContext();
  const { token } = user ?? { token: null };
  const router = useRouter();

useEffect(()=>{
  if (token) {
    router.push('/');
  } else {
    router.push('/register');
  }

},[])
   




  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        
        
        </body>
    </html>
  );
}
