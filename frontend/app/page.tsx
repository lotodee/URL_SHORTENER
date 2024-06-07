"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { AuthInput, Button } from "@/components";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation"; 

const Register = () => {
  // Hooks
  const { user } = useAuthContext();
  const router = useRouter();
  const { token } = user ?? { token: null };
  const { register } = useRegister();

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

  // Event handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setEmailError("Invalid email");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
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
          {emailError && <div className={styles.error}>{emailError}</div>}

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
          {passwordError && <div className={styles.error}>{passwordError}</div>}

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
          {confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}
        </div>

        <div className={styles.buttons}>
          {/* Register button */}
          <Button text="Create Account" onclick={handleRegister} />
        </div>

        <div className={styles.bottom_texts}>
          <p className={styles.question}>Already have an account?</p>
          {/* Link to login page */}
          <Link href={"/login"}>
            <span className={styles.login}>Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
