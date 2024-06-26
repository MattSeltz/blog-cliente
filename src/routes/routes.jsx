import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Recovery } from "../pages/recovery";
import { RecoveryAccount } from "../pages/recoveryAccount";
import { NavBar } from "../layout/navBar";
import { Publications } from "../pages/publications";
import { PublicationPage } from "../pages/publicationPage";
import { Profile } from "../pages/profile";
import { User } from "../pages/user";

export const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Publications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/recovery/:id" element={<RecoveryAccount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<h1>Notifications</h1>} />
        <Route path="/publication/:id" element={<PublicationPage />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
};
