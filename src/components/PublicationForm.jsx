import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, TextField, CircularProgress, Box } from "@mui/material";

import {
  postData,
  getData,
  getOneData,
  updateData,
} from "../services/services";
import { setGlobalUser } from "../contexts/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: 500,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const PublicationForm = ({ open, setOpen, setPublicationList }) => {
  const userGlobal = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    if (title && content) {
      setIsLoading(true);
      setErrorMessage(false);

      const data = await postData("/publication", {
        author: userGlobal._id,
        title,
        content,
        date: new Date().toISOString(),
      });

      const user = await getOneData("/user/", userGlobal._id);
      user.publications.push(data._id);
      await updateData("/user/", userGlobal._id, {
        publications: user.publications,
      });

      const res = await getData("/publication");

      dispatch(setGlobalUser(user));
      setPublicationList(res.reverse());
      setTitle("");
      setContent("");
      setOpen(false);
      setIsLoading(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {errorMessage && <p className="text-red-500">Falta completar datos</p>}
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-basic"
          label="Titulo"
          variant="outlined"
        />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="outlined-multiline-static"
          label="Contenido"
          rows={10}
          multiline
        />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button variant="contained" onClick={send}>
            Publicar
          </Button>
        )}
      </Box>
    </Modal>
  );
};
