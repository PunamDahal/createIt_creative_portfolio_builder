import React from "react";
import Button from "../../components/Button/Button";

const Error = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/ ">
      <Button text="Return to Home" />
      </Link>
    </div>
  );
};
 
export default Error;
