import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setGlobalUser } from "../contexts/userSlice";

import { getData, getOneData, updateData } from "../services/services";

export const Publication = ({ publication, setPublicationList }) => {
  const userGlobal = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isMatch = publication.likes.filter(
      (item) => item._id === userGlobal?._id
    );

    isMatch.length > 0 ? setIsLiked(true) : setIsLiked(false);
  }, [userGlobal]);

  const sendLike = async (like) => {
    if (!userGlobal) {
      alert("Inicia sesión para interactuar...");
      navigate("/login");
      return;
    }

    if (like) {
      const { likes } = await getOneData("/publication/", publication._id);
      likes.push(userGlobal._id);
      const resStatus = await updateData("/publication/", publication._id, {
        likes,
      });
      if (resStatus.status.toLocaleString().startsWith("4")) {
        alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        return;
      }
      const user = await getOneData("/auth/", userGlobal._id);
      user.likes.push(publication._id);
      const userStatus = await updateData("/auth/like/", userGlobal._id, {
        likes: user.likes,
      });
      if (userStatus.status.toLocaleString().startsWith("4")) {
        alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        return;
      }
      dispatch(setGlobalUser(user));
      const resData = await getData("/publication");
      setPublicationList(resData.reverse());
      setIsLiked(like);
    } else {
      const { likes } = await getOneData("/publication/", publication._id);
      const disLike = likes.filter((item) => item._id !== userGlobal._id);
      const resStatus = await updateData("/publication/", publication._id, {
        likes: disLike,
      });
      if (resStatus.status.toLocaleString().startsWith("4")) {
        alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        return;
      }
      const user = await getOneData("/auth/", userGlobal._id);
      const disLikeUser = user.likes.filter((item) => item !== publication._id);
      const userStatus = await updateData("/auth/like/", userGlobal._id, {
        likes: disLikeUser,
      });
      if (userStatus.status.toLocaleString().startsWith("4")) {
        alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
        return;
      }
      dispatch(setGlobalUser(user));
      const resData = await getData("/publication");
      setPublicationList(resData.reverse());
      setIsLiked(like);
    }
  };

  return (
    <article
      id={publication._id}
      className="flex flex-col items-start justify-between shadow-md p-3 rounded-md"
    >
      <div className="flex justify-between items-center gap-x-4 text-xs w-full">
        {location.pathname === "/" && (
          <div className="flex items-center gap-3">
            <img
              src={publication.author[0].icon}
              alt={publication.author[0].username}
              className="rounded-full w-5"
            />
            <p className="font-semibold text-gray-900">
              <Link to={`/user/${publication.author[0]._id}`}>
                {publication.author[0].username}
              </Link>
            </p>
          </div>
        )}
        <time dateTime={publication.date} className="text-gray-500">
          {publication.date.split("T")[0]}{" "}
          {publication.date.split("T")[1].split(":")[0] - 3}:
          {publication.date.split("T")[1].split(":")[1]}
        </time>
      </div>
      <div className="group relative w-full">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 ">
          {publication.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {publication.content}
        </p>
        <br />
        <Divider />
        <div className="flex justify-between mt-3">
          <div className="flex gap-1">
            {isLiked ? (
              <FavoriteIcon
                onClick={() => sendLike(false)}
                className="cursor-pointer"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => sendLike(true)}
                className="cursor-pointer"
              />
            )}
            <span>
              <b>{publication.likes.length}</b>
            </span>
          </div>

          <Link
            to={`/publication/${publication._id}`}
            className="cursor-pointer"
          >
            <ChatBubbleOutlineIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};
