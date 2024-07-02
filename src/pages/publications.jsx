import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";

import { getData } from "../services/services";
import { Publication } from "../components/Publication";
import { PublicationForm } from "../components/PublicationForm";

export const Publications = () => {
  const userGlobal = useSelector((state) => state.user.value);
  const [publicationList, setPublicationList] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData("/publication")
      .then((res) => setPublicationList(res.reverse()))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        {userGlobal && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Nueva publicación
          </Button>
        )}

        <PublicationForm
          open={open}
          setOpen={setOpen}
          setPublicationList={setPublicationList}
        />

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
