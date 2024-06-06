"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { AuthInput, Button } from "@/components";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/hooks/useAuthContext";
const Login = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { token } = user ?? { token: null };
  if(token){
router.push("/")
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const {login ,error ,isLoading ,loggedIn } =useLogin()
  const handleLogin = async () => {
  await login(email,password)

 

  };
  return (
    <div className={styles.main}>
      <div className={styles.login_wrapper}>
        <div className={styles.top}>
          <p className={styles.mainText}>Log In</p>
          <p className={styles.infoText}>
            Enter your credentials to access your account
          </p>
        </div>

        <div className={styles.inputs}>
          <AuthInput
            labelText="EMAIL ADDRESS"
            type="text"
            value={email}
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            placeholderText="Enter your email"
            icon="/env.svg"
          />
          <AuthInput
            labelText="PASSWORD"
            type={openPassword ? "text" : "password"}
            value={password}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            onclick={()=>{setOpenPassword(!openPassword)}}
            placeholderText="Enter Password"
            icon={openPassword ? "/eyeopen.svg":"/eyeclosed.svg"}
          />
          {error && (
            <div className={styles.error}>{error}</div>
          )}
        </div>

        <div className={styles.buttons}>
          <Button text="Log into Account" onclick={handleLogin} disabled={isLoading}/>
        </div>

        <div className={styles.bottom_texts}>
          <p className={styles.question}>Are you new here?</p>
          
            <Link href={"/register"}>
            <span className={styles.login}>Create Account</span>
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
