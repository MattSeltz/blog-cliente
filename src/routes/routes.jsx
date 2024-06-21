import { Routes, Route, Link } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Recovery } from "../pages/recovery";
import { RecoveryAccount } from "../pages/recoveryAccount";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Home</h1>

            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/recovery/:id" element={<RecoveryAccount />} />
    </Routes>
  );
};
