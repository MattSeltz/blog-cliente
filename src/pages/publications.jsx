import { useEffect, useState } from "react";

import { getData } from "../services/services";
import { Publication } from "../components/Publication";

export const Publications = () => {
  const [publicationList, setPublicationList] = useState(null);

  useEffect(() => {
    getData("/publication")
      .then((res) => setPublicationList(res))
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
