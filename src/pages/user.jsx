import { useEffect, useState } from "react";

import { getOneData } from "../services/services";
import { Publication } from "../components/Publication";

export const User = () => {
  const [publicationList, setPublicationList] = useState(null);

  useEffect(() => {
    getOneData(`/auth/`, location.pathname.split("/")[2])
      .then((res) => setPublicationList(res.publications.reverse()))
      .catch((e) => console.error(e));
  }, []);

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
