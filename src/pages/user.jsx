import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

import { useEffect, useState } from "react";

import { getOneData } from "../services/services";
import { Publication } from "../components/Publication";

export const User = () => {
  const [publicationList, setPublicationList] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getOneData("/auth/", location.pathname.split("/")[2])
      .then((res) => {
        setPublicationList(res.publications.reverse());
        setUser(res);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        <img
          src={user?.icon}
          alt={user?.username}
          className="rounded-full mx-auto"
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ThemeProvider theme={darkTheme}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.default",
                  display: "grid",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Item elevation={24}>Nombre de usuario: {user?.username}</Item>
                <Item elevation={24}>
                  Activo desde: {user?.createdAt.split("T")[0]}
                </Item>
                <Item elevation={24}>
                  Publicaciones: {user?.publications.length}
                </Item>
                <Item elevation={24}>Comentarios: {user?.comments.length}</Item>
                <Item elevation={24}>Likes: {user?.likes.length}</Item>
              </Box>
            </ThemeProvider>
          </Grid>
        </Grid>
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
