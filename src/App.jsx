import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Router } from "./routes/routes";
import { setGlobalUser } from "./contexts/userSlice";
import { getOneData } from "./services/services";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("globalUser"));
    const user = JSON.parse(localStorage.getItem("globalUser"));

    if (!user && !sessionUser) return;

    getOneData("/user/", user ?? sessionUser)
      .then((res) => dispatch(setGlobalUser(res)))
      .catch((e) => console.error(e));
  }, []);

  return <Router />;
};
