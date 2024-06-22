import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Recovery } from "../pages/recovery";
import { RecoveryAccount } from "../pages/recoveryAccount";
import { NavBar } from "../layout/navBar";

export const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/recovery/:id" element={<RecoveryAccount />} />
        <Route path="profile" element={<h1>Profile</h1>} />
        <Route path="notifications" element={<h1>Notifications</h1>} />
      </Routes>
    </>
  );
};
