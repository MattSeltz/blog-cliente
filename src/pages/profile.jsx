import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Grid, Paper, Button, Box } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Publication } from "../components/Publication";
import { getOneData } from "../services/services";

export const Profile = () => {
  const userGlobal = useSelector((state) => state.user.value);
  const [publicationList, setPublicationList] = useState(null);

  useEffect(() => {
    if (!userGlobal) return;

    getOneData("/user/", userGlobal?._id)
      .then((res) => setPublicationList(res.publications.reverse()))
      .catch((e) => console.error(e));
  }, [userGlobal]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        <img
          src={userGlobal?.icon}
          alt={userGlobal?.username}
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
                <Item elevation={24}>
                  Nombre de usuario: {userGlobal?.username}
                </Item>
                <Item elevation={24}>
                  Activo desde: {userGlobal?.createdAt.split("T")[0]}
                </Item>
                <Item elevation={24}>
                  Publicaciones: {userGlobal?.publications.length}
                </Item>
                <Item elevation={24}>
                  Comentarios: {userGlobal?.comments.length}
                </Item>
                <Item elevation={24}>
                  Likes:{" "}
                  {userGlobal?.likes.concat(userGlobal?.commentLikes).length}
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Link to="/edit">
          <Button variant="contained" className="w-full">
            Editar perfil
          </Button>
        </Link>
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
