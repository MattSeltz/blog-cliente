import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { green } from "@mui/material/colors";
import {
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Box,
} from "@mui/material";

import { postData } from "../services/services";
import { setGlobalUser } from "../contexts/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(true);

  const send = async (e) => {
    e.preventDefault();

    if (username && password) {
      setErrorMessage(false);
      setIsLoading(true);
      setIsMatch(true);

      const data = await postData("/auth/login", { username, password });

      if (remember) {
        localStorage.setItem("globalUser", JSON.stringify(data._id));
      } else {
        sessionStorage.setItem("globalUser", JSON.stringify(data._id));
      }

      dispatch(setGlobalUser(data));
      navigate("/");

      setUsername("");
      setPassword("");
      setIsLoading(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://cdn-icons-png.flaticon.com/128/1168/1168120.png"
          alt="Blog"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      {errorMessage && (
        <p className="mt-3 text-center text-xl text-red-500">
          Falta completar datos
        </p>
      )}

      {!isMatch && (
        <p className="mt-3 text-center text-xl text-red-500">
          Nombre de usuario o contraseña incorrectos
        </p>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" autoComplete="off" onSubmit={send}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre de usuario
            </label>
            <div className="mt-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="text-sm">
                <Link
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  to="/recovery"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: isLoading && "no-drop",
            }}
          >
            <Box sx={{ width: "100%", position: "relative" }}>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ cursor: isLoading && "no-drop" }}
              >
                Inicia sesión
              </button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                    cursor: isLoading && "no-drop",
                  }}
                />
              )}
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
            }
            label="Recordarme"
          />
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No eres miembro?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/register"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
