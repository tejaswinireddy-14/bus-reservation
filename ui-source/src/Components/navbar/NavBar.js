import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import "./NavBar.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Login from "../Authentication/Login";
import ShowTicket from "../ShowTicket/ShowTicket";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [state, setState] = React.useState({
    menu: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const myStyles = {
    wrapper: {
      backgroundImage:
        `url{"https://s.alicdn.com/@sc04/kf/UTB8VHyqoL2JXKJkSanr7613lVXaw.png_960x960.png"}`,
      // height: "100vh",
      // marginTop: "-70px",
      // fontSize: "50px",
      // backgroundSize: "cover",
      // backgroundRepeat: "no-repeat",
    },
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Login", "View Bookings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <LoginIcon /> : <VisibilityIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
    className="tejaswini"
   
    >
      {/* <div
        className="navbar"
        
      >
        <div className="navcontainer"></div>
        <div className="navItems">
          <Link to={"/login"}>
            <Button sx={{ color: 'white',}} className="navButton">
              Login
            </Button>
          </Link>
          <Link to={`/myBooking`}>
            <Button
              // variant="contained"
              // color="primary"
              sx={{ color: 'white',}}
              className="add-routeStop"
            >
              Bookings
            </Button>
          </Link>
        </div>
      </div> */}
      <div
      style={
        {
          backgroundImage:`url("https://s.alicdn.com/@sc04/kf/UTB8VHyqoL2JXKJkSanr7613lVXaw.png_960x960.png")`,
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
         backgroundColor:"rgba(0,0,0,0.08)",
   
          height:"calc(100vh - 100px)"
        }
      }
      >

      </div>
    </div>
   
  );
}
