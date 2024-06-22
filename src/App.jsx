import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Router } from "./routes/routes";
import { setGlobalUser } from "./contexts/userSlice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("globalUser"));

    dispatch(setGlobalUser(user));
  }, []);

  return <Router />;
};
