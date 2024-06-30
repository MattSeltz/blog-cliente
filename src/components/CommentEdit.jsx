import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";

import { getData, updateData } from "../services/services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: 300,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CommentEdit = ({ isOpen, setIsOpen, comment, setCommentList }) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const send = async () => {
    if (content) {
      setIsLoading(true);
      setErrorMessage(false);

      const res = await updateData("/comment/", comment._id, {
        content,
      });

      if (res.status.toLocaleString().startsWith("4")) {
        alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        return;
      }

      const commentList = await getData("/comment");

      setCommentList(commentList.reverse());
      setContent("");
      setIsOpen(false);
      setIsLoading(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {errorMessage && <p className="text-red-500">Falta completar datos</p>}
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="outlined-multiline-static"
          label="Contenido"
          rows={5}
          multiline
        />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button variant="contained" onClick={send}>
            Actualizar
          </Button>
        )}
      </Box>
    </Modal>
  );
};
