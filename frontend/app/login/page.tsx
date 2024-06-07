import React, { useState } from "react";
import styles from "./page.module.css";
import { AuthInput, Button } from "@/components";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from 'next/router'; // Fix incorrect import
import { useAuthContext } from "@/hooks/useAuthContext";

const Login = () => {
  // Hooks
  const { user } = useAuthContext();
  const router = useRouter();
  const { token } = user ?? { token: null };
  const { login, error, isLoading } = useLogin();

  // Redirect if user is logged in
  if (token) {
    router.push("/home");
  }

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);

  // Login handler
  const handleLogin = async () => {
    await login(email, password);
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
          {/* Email input */}
          <AuthInput
            labelText="EMAIL ADDRESS"
            type="text"
            value={email}
            onchange={(e) => setEmail(e.target.value)}
            placeholderText="Enter your email"
            icon="/env.svg"
          />
          {/* Password input */}
          <AuthInput
            labelText="PASSWORD"
            type={openPassword ? "text" : "password"}
            value={password}
            onchange={(e) => setPassword(e.target.value)}
            onclick={() => setOpenPassword(!openPassword)}
            placeholderText="Enter Password"
            icon={openPassword ? "/eyeopen.svg" : "/eyeclosed.svg"}
          />
          {/* Error message */}
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.buttons}>
          {/* Login button */}
          <Button text="Log into Account" onclick={handleLogin} disabled={isLoading} />
        </div>

        <div className={styles.bottom_texts}>
          <p className={styles.question}>Are you new here?</p>
          {/* Link to create account */}
          <Link href={"/"}>
            <span className={styles.login}>Create Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
