import React from "react";
import background from "../assets/login-signup-background.jpg";

export default function BackgroundImage() {
  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const imageStyle = {
    height: "100vh",
    width: "100vw",
  };

  return (
    <div style={containerStyle}>
      <img src={background} alt="background" style={imageStyle} />
    </div>
  );
}
