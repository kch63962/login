import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import UserInfoPage from "./pages/UserInfoPage";
import MyImage from "./components/MyImage/MyImage";

const App = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home/:name/image' element={<MyImage />} />
          <Route path='/home/:name' element={<UserInfoPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
