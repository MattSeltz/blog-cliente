import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Router } from "./routes/routes";
import { setGlobalUser } from "./contexts/userSlice";
import { getOneData } from "./services/services";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("globalUser"));

    if (!user) return;

    getOneData("/auth/", user._id)
      .then((res) => dispatch(setGlobalUser(res)))
      .catch((e) => console.error(e));
  }, []);

  return <Router />;
};
