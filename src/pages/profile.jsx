import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Publication } from "../components/Publication";
import { getOneData } from "../services/services";

export const Profile = () => {
  const userGlobal = useSelector((state) => state.user.value);
  const [publicationList, setPublicationList] = useState(null);

  useEffect(() => {
    if (!userGlobal) return;

    getOneData("/auth/", userGlobal?._id)
      .then((res) => setPublicationList(res.publications.reverse()))
      .catch((e) => console.error(e));
  }, [userGlobal]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        {publicationList?.map((publication) => (
          <Publication
            key={publication._id}
            publication={publication}
            setPublicationList={setPublicationList}
          />
        ))}
      </div>
    </div>
  );
};
