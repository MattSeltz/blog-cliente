import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setGlobalUser } from "../contexts/userSlice";
import {
  getData,
  getOneData,
  updateData,
  deleteData,
} from "../services/services";

export const Edit = () => {
  const userGlobal = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const deleteAccount = async () => {
    const comments = await getData("/comment");
    comments.forEach(async (item) => {
      if (item.author[0]._id === userGlobal._id) {
        const deleteCommentRes = await deleteData("/comment/", item._id);
        if (deleteCommentRes.status.toLocaleString().startsWith("4")) {
          alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
          return;
        }
      }
    });
    const publications = await getData("/publication");
    publications.forEach(async (item) => {
      if (item.author[0]._id === userGlobal._id) {
        const deletePublicationRes = await deleteData(
          "/publication/",
          item._id
        );
        if (deletePublicationRes.status.toLocaleString().startsWith("4")) {
          alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
          return;
        }
      }
    });
    const user = await deleteData("/auth/user/", userGlobal._id);
    if (user.status.toLocaleString().startsWith("4")) {
      alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
      return;
    }
    sessionStorage.removeItem("globalUser");
    dispatch(setGlobalUser(null));
    navigate("/");
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    if (password && matchPassword && username) {
      setErrorMessage(false);
      if (password === matchPassword) {
        setIsLoading(true);
        setIsMatch(true);

        const res = await updateData("/auth/user/", userGlobal._id, {
          password,
          username,
        });
        const data = await res.json();

        if (res.status.toLocaleString().startsWith("2")) {
          sessionStorage.setItem("globalUser", JSON.stringify(data));
          dispatch(setGlobalUser(data));
          navigate("/");
        } else {
          alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        }

        setIsLoading(false);
      } else {
        setIsMatch(false);
      }

      setPassword("");
      setMatchPassword("");
      setUsername("");
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
          Actualización de perfil
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
        <form className="space-y-6" autoComplete="off" onSubmit={updateAccount}>
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
                value={matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
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
                Actualizar
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

          <button
            onClick={() => setOpen(true)}
            type="button"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Eliminar
          </button>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Estas seguro que deseas eliminar tu perfil?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Esta acción no se puede deshacer
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div className="flex justify-between w-full">
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={deleteAccount}
                >
                  Aceptar
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  );
};
