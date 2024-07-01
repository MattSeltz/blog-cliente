import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import { deleteData, getData } from "../services/services";
import { setGlobalUser } from "../contexts/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.value);

  const [userList, setUserList] = useState(null);
  const [userListToSearch, setUserListToSearch] = useState(null);

  useEffect(() => {
    getData("/auth")
      .then((res) => setUserListToSearch(res))
      .catch((e) => console.error(e));
  }, []);

  const logout = async () => {
    const res = await deleteData("/auth/logout/", 0);

    if (res.status.toLocaleString().startsWith("2")) {
      setMobileMoreAnchorEl(null);
      dispatch(setGlobalUser(null));
      localStorage.removeItem("globalUser");
      sessionStorage.removeItem("globalUser");
      navigate("/");
    } else {
      alert("Ha ocurrido un error inesperado, vuelve a intentarlo...");
    }
  };

  const search = (e) => {
    let user = e.target.value;

    if (user) {
      const userListCopy = [...userListToSearch];
      let newUserList = userListCopy.filter((item) =>
        item.username.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setUserList(newUserList);
    } else {
      setUserList(null);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userGlobal ? (
        <>
          <Link to="/profile" onClick={handleMobileMenuClose}>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Perfil</p>
            </MenuItem>
          </Link>

          <MenuItem onClick={logout}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
            <p>Cerrar sesión</p>
          </MenuItem>
        </>
      ) : (
        <>
          <Link to="/login" onClick={handleMobileMenuClose}>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LoginIcon />
              </IconButton>
              <p>Inicia sesión</p>
            </MenuItem>
          </Link>
          <Link to="/register" onClick={handleMobileMenuClose}>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <CreateIcon />
              </IconButton>
              <p>Registrate</p>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BLOG
          </Typography>
          <Search onChange={search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {userList && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "fixed",
                top: "55px",
                left: "65px",
                borderRadius: "5px",
                color: "#000000",
              }}
            >
              <nav aria-label="main mailbox folders">
                <List>
                  {userList?.map((item) => (
                    <Link
                      to={`/user/${item._id}`}
                      key={item._id}
                      onClick={() => {
                        setUserList(null);
                        setUserListToSearch(null);
                      }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar alt={item.username} src={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.username} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </nav>
              <Divider />
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {userGlobal ? (
              <>
                <Link to="/profile">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>

                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={logout}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/login">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <LoginIcon />
                  </IconButton>
                </Link>
                <Link to="/register">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <CreateIcon />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
