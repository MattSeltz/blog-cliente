import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";

import { updateData } from "../services/services";

export const RecoveryAccount = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [comparedPassword, setComparedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(true);

  const send = async (e) => {
    e.preventDefault();

    if (password && comparedPassword) {
      setErrorMessage(false);
      if (password === comparedPassword) {
        setIsLoading(true);
        setIsMatch(true);

        let id = location.pathname.split("/")[2];

        const res = await updateData("/auth/recovery/", id, { password });

        if (res.status.toLocaleString().startsWith("2")) {
          navigate("/login");
        } else {
          alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        }

        setIsLoading(false);
      } else {
        setIsMatch(false);
      }

      setPassword("");
      setComparedPassword("");
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
          Recuperación de cuenta
        </h2>
      </div>

      {errorMessage && (
        <p className="mt-3 text-center text-xl text-red-500">
          Falta completar datos
        </p>
      )}

      {!isMatch && (
        <p className="mt-3 text-center text-xl text-red-500">
          No coinciden las contraseñas
        </p>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" autoComplete="off" onSubmit={send}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nueva contraseña
            </label>
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

          <div>
            <label
              htmlFor="comparedPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Repita la contraseña
            </label>
            <div className="mt-2">
              <input
                value={comparedPassword}
                onChange={(e) => setComparedPassword(e.target.value)}
                id="comparedPassword"
                name="comparedPassword"
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
                Guardar
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
      </div>
    </div>
  );
};
