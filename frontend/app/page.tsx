"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { AuthInput, Button, Modal } from "@/components";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

const Register = () => {
  // Hooks
  const { user } = useAuthContext();
  const router = useRouter();
  const { token } = user ?? { token: null };
  const { register,error ,resetError,handleModalClose,openModal,isLoading} = useRegister();

  // Redirect if user is logged in
  if (token) {
    router.push("/home");
  }

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [empty ,setEmpty] = useState("")

  // Event handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    resetError()
    setEmailError("");
    setEmpty("");
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setEmailError("Invalid email");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
    setEmpty("");
    setPassword(e.target.value);
    const passwordStrength = checkPasswordStrength(e.target.value);
    if (passwordStrength === "not strong") {
      setPasswordError("Too short: Password must be at least 8 chars, 1 uppercase, 1 lowercase, and 1 number.");
    } else if (passwordStrength === "weak") {
      setPasswordError("Weak: Password must be at least 8 chars, 1 uppercase, 1 lowercase, and 1 number");
    } else if (passwordStrength === "perfect") {
      setPasswordError("");
    } else {
      setPasswordError("Password is not strong enough.");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setConfirmPasswordError("");
    setEmpty("");
    setPassword_confirmation(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError("Passwords do not match");
    }
  };

  const isValidEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) {
      return "not strong";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      return "weak";
    } else {
      return "perfect";
    }
  };

  const handleRegister = async () => {
    if(email === "" || password == "" || password_confirmation == ""){
      setEmpty("no field must be empty")
    } 
    if (emailError === "" && passwordError === "" && confirmPasswordError === "") {
      await register(email, password, password_confirmation);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.login_wrapper}>
        <div className={styles.top}>
          <p className={styles.mainText}>Create an account</p>
          <p className={styles.infoText}>Enter your credentials to create your account</p>
        </div>

        <div className={styles.inputs}>
          {/* Email input */}
          <AuthInput
            labelText="EMAIL ADDRESS"
            type="text"
            value={email}
            onchange={handleEmailChange}
            placeholderText="Enter your email"
            icon="/env.svg"
          />
          {emailError && <div className={styles.Email_error}>{emailError}</div>}
          {error === "This user is registered" && <div className={styles.error}>{error}</div>}
          {/* Password input */}
          <AuthInput
            labelText="CREATE PASSWORD"
            type={openPassword ? "text" : "password"}
            value={password}
            onchange={handlePasswordChange}
            placeholderText="Enter Password"
            icon={openPassword ? "/eyeopen.svg" : "/eyeclosed.svg"}
            onclick={() => {
              setOpenPassword(!openPassword);
            }}
          />
          {passwordError && <div className={styles.Password_error}>{passwordError}</div>}

          {/* Confirm Password input */}
          <AuthInput
            labelText="CONFIRM PASSWORD"
            type={openConfirmPassword ? "text" : "password"}
            value={password_confirmation}
            onchange={handleConfirmPasswordChange}
            placeholderText="Enter Password"
            icon={openConfirmPassword ? "/eyeopen.svg" : "/eyeclosed.svg"}
            onclick={() => {
              setOpenConfirmPassword(!openConfirmPassword);
            }}
          />
          {confirmPasswordError && <div className={styles.Confirm_error}>{confirmPasswordError}</div>}
          {empty && <div className={styles.Empty_error}>{empty}</div>}
        </div>

        <div className={styles.buttons}>
          {/* Register button */}
          <Button text={isLoading ?  "Please Wait..." : "Create Account"} onclick={handleRegister} />
        </div>

        <div className={styles.bottom_texts}>
          <p className={styles.question}>Already have an account?</p>
          {/* Link to login page */}
          <Link href={"/login"}>
            <span className={styles.login}>Log In</span>
          </Link>
        </div>
      </div>
      <Modal  isOpen={openModal}>
      <Image src="/close.svg" alt="close_icon" width={20} height={20} className={styles.close} onClick={handleModalClose} style={{cursor:`pointer`}}/>
        <div className={styles.modalWrapper}>
            <Image src="/networkError.png" alt="error_icon" width={50} height={50}/>
            <span className={styles.network}>Network Error</span>
            <div className={styles.network}>Our servers may be down</div>
            <span className={styles.or}>OR</span>
            <div className={styles.network}>Please check your network connection</div>
        </div>
        
        
   </Modal> 
    </div>
  );
};

export default Register;
