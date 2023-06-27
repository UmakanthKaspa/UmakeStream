import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./Components/Home";
import SignupPage from "./pages/SignupPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
       
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
