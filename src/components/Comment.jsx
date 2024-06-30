import { Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export const Comment = ({ comment }) => {
  return (
    <article
      id={comment._id}
      className="flex flex-col items-start justify-between shadow-md p-3 rounded-md"
    >
      <div className="flex justify-between items-center gap-x-4 text-xs w-full">
        <div className="flex items-center gap-3">
          <Avatar
            alt={comment.author[0].username}
            src={comment.author[0].icon}
          />
          <p className="font-semibold text-gray-900">
            <Link to={`/user/${comment.author[0]._id}`}>
              {comment.author[0].username}
            </Link>
          </p>
        </div>
        <time dateTime={comment.date} className="text-gray-500">
          {comment.date.split("T")[0]}{" "}
          {comment.date.split("T")[1].split(":")[0] - 3}:
          {comment.date.split("T")[1].split(":")[1]}
        </time>
      </div>
      <div className="group relative w-full">
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {comment.content}
        </p>
        <br />
        <Divider />
        <div className="flex justify-between mt-3">
          <div className="flex gap-1">
            {/* {isLiked ? (
              // <FavoriteIcon
              //   onClick={() => sendLike(false)}
              //   className="cursor-pointer"
              // />
            ) : (
              // <FavoriteBorderIcon
              //   onClick={() => sendLike(true)}
              //   className="cursor-pointer"
              // />
            )} */}
            <span>{/* <b>{publication.likes.length}</b> */}</span>
          </div>

          {/* <Link
            to={`/publication/${publication._id}`}
            className="cursor-pointer"
          >
            <ChatBubbleOutlineIcon />
          </Link> */}
        </div>
      </div>
    </article>
  );
};
