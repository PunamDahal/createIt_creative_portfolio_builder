import React from "react";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const handleLogin = (provider) => {
    window.location.href = `http://localhost:8000/login/${provider}`;
  };

  return (
    <div>
      <Header />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>Sign in to CreateIT</h1>
          <p>Login or register to start building your portfolio today.</p>
          <Button text="Sign in with Google" onClick={() => handleLogin("google")} />
          <Button text="Sign in with GitHub" onClick={() => handleLogin("github")} />
          <Button text="Sign in with LinkedIn" onClick={() => handleLogin("linkedin")} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
