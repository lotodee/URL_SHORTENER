"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { AuthInput, Button } from "@/components";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation"
const Register = () => {

  const { user } = useAuthContext();
  const router = useRouter();
  const { token } = user ?? { token: null };
  if(token){
router.push("/")
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
const {register} = useRegister()
  const handleRegister =async () => {
await register(email,password,password_confirmation)
   
  };

  return (
    <div className={styles.main}>
      <div className={styles.login_wrapper}>
        <div className={styles.top}>
          <p className={styles.mainText}>Create an account</p>
          <p className={styles.infoText}>
            Enter your credentials to create your account
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
            labelText="CREATE PASSWORD"
            type={openPassword ? "text" : "password"}
            value={password}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            placeholderText="Enter Password"
            icon={openPassword ? "/eyeopen.svg" : "/eyeclosed.svg"}
            onclick={() => {
              setOpenPassword(!openPassword);
            }}
          />
          <AuthInput
            labelText="CONFIRM PASSWORD"
            type={openConfirmPassword ? "text" : "password"}
            value={password_confirmation}
            onchange={(e) => {
              setPassword_confirmation(e.target.value);
            }}
            placeholderText="Enter Password"
            icon={openConfirmPassword ? "/eyeopen.svg" : "/eyeclosed.svg"}
            onclick={() => {
              setOpenConfirmPassword(!openConfirmPassword);
            }}
          />
        </div>

        <div className={styles.buttons}>
          <Button text="Create Account" onclick={handleRegister} />
        </div>

        <div className={styles.bottom_texts}>
          <p className={styles.question}>Already have an account?</p>
          <Link href={"/login"}>
          <span className={styles.login}>Log In</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
