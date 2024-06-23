import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useState } from "react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

export const Publication = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex max-w-xl flex-col items-start justify-between shadow-md p-3 rounded-md"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.datetime} className="text-gray-500">
                {post.date}
              </time>
              <p className="font-semibold text-gray-900">
                <Link to="/user/1">{post.author.name}</Link>
              </p>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 ">
                {post.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.description}
              </p>
              <br />
              <Divider />
              <div className="flex justify-between mt-3">
                <div className="flex gap-1">
                  {isLiked ? (
                    <FavoriteIcon
                      onClick={() => setIsLiked(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() => setIsLiked(true)}
                      className="cursor-pointer"
                    />
                  )}
                  <span>
                    <b>500.000.000</b>
                  </span>
                </div>

                <Link to="/publication/1" className="cursor-pointer">
                  <ChatBubbleOutlineIcon />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
