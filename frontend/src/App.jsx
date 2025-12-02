import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SideBar from "./components/common/SideBar";
import RightPanel from "./components/common/RightPanel";



const App = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      
      <SideBar />

      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <RightPanel />
    </div>
  );
}

export default App;