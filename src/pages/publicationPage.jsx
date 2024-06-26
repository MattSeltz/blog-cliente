import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOneData } from "../services/services";

export const PublicationPage = () => {
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    getOneData("/publication/", location.pathname.split("/")[2])
      .then((res) => setPublication(res))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 ">
        <div>
          <div>
            <div>
              <p className="text-base font-semibold leading-7 text-indigo-600">
                <Link to={`/user/${publication?._id}`}>
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
      </div>
    </div>
  );
};
