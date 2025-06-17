import React, { use, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Notes from "./components/Notes"; // Move notes logic here

function App() {
  const [token, setToken] = useState(localStorage.getItem("access") || "");
  const [username, setUsername] = useState("");

const handleLogin = ({ access, refresh, username }) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  setToken(access);
  setUsername(username); // set username here
};



  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken("");
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />  {/*Now home page is login */}
      <Route path="/register" element={<RegisterForm onRegister={() => window.location.href = "/"} />} />
      <Route
             path="/notes"
             element={token ? <Notes token={token} logout={logout} username={username}/> : <Navigate to="/" />}
             />

     </Routes>
    </Router>
  );
}

export default App;
