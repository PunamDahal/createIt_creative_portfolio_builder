import React from "react";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header"

const Error = () => {
  return (
    <>
    <Header />
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>

    </div>
    </>
  );
};
 
export default Error;
