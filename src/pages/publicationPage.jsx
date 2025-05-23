import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, TextField, CircularProgress, Box } from "@mui/material";

import { getOneData, postData, updateData } from "../services/services";
import { Comment } from "../components/Comment";

export const PublicationPage = () => {
  const userGlobal = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const [publication, setPublication] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOneData("/publication/", location.pathname.split("/")[2])
      .then((res) => {
        setPublication(res);
        setCommentList(res.comments.reverse());
      })
      .catch((e) => console.error(e));
  }, []);

  const sendComment = async () => {
    if (!userGlobal) {
      alert("Inicia sesión para interactuar...");
      navigate("/login");
      return;
    }

    if (content) {
      setIsLoading(true);
      setErrorMessage(false);

      const data = await postData("/comment", {
        author: userGlobal._id,
        content,
        publication: publication?._id,
        date: new Date().toISOString(),
      });

      const { comments } = await getOneData(
        "/publication/",
        location.pathname.split("/")[2]
      );
      comments.push(data._id);
      await updateData("/publication/", location.pathname.split("/")[2], {
        comments,
      });

      const user = await getOneData("/user/", userGlobal._id);
      user.comments.push(data._id);
      await updateData("/user/", userGlobal._id, {
        comments: user.comments,
      });

      const currentPublication = await getOneData(
        "/publication/",
        location.pathname.split("/")[2]
      );

      setCommentList(currentPublication.comments.reverse());
      setContent("");
      setIsLoading(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 ">
        <div>
          <div>
            <div>
              <p className="text-base font-semibold leading-7 text-indigo-600">
                <Link to={`/user/${publication?.author[0]._id}`}>
                  {publication?.author[0].username}
                </Link>
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {publication?.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                {publication?.content}
              </p>
            </div>
          </div>
        </div>
        <TextField
          id="outlined-multiline-static"
          label="Deja tu comentario..."
          rows={5}
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errorMessage && <p className="text-red-500">Falta completar datos</p>}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button variant="contained" onClick={sendComment}>
            Enviar comentario
          </Button>
        )}

        {commentList?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            setCommentList={setCommentList}
          />
        ))}
      </div>
    </div>
  );
};
