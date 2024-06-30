import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";

import { postData } from "../services/services";

export const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(true);

  const send = async (e) => {
    e.preventDefault();

    if (username && email && password) {
      setErrorMessage(false);
      setIsLoading(true);
      setIsMatch(true);

      const res = await postData("/auth/register", {
        username,
        email,
        password,
      });

      if (res.status.toLocaleString().startsWith("2")) {
        navigate("/login");
      } else {
        setIsMatch(false);
      }

      setUsername("");
      setEmail("");
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
          Regístrate
        </h2>
      </div>

      {errorMessage && (
        <p className="mt-3 text-center text-xl text-red-500">
          Falta completar datos
        </p>
      )}

      {!isMatch && (
        <p className="mt-3 text-center text-xl text-red-500">
          Nombre de usuario o email existentes
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
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
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
                Regístrate
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
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ya tienes una cuenta?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/login"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
