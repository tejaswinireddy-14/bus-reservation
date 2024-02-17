import React from "react";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Button from "@mui/material/Button";
import withRouter from "../Authentication/WithRouter";
import { Link } from "react-router-dom";
import { Select } from "@mui/material";

class AdminPage extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navcontainer">
          <div className="navItems">
            
            <Link to={`/addRoutes`}>
              <Button
                style={{
                  width: "5%",
                  marginLeft: "2%",
                }}
                sx={{ color: "white" }}
                className="help"
              >
                Add Routes
              </Button>
            </Link>
            <Link to={`/addSchedules`}>
              <Button sx={{ color: "white" }} className="add-schedule">
                Add Schedules
              </Button>
            </Link>
            <Link to={`/addStops`}>
              <Button sx={{ color: "white" }} className="add-routeStop">
                Add RouteStops
              </Button>
            </Link>
            <Link to={`/viewStops`}>
              <Button sx={{ color: "white" }} className="view-routeStops">
                View RouteStops
              </Button>
            </Link>
            <Link to={`/viewSchedules`}>
              <Button sx={{ color: "white" }} className="view-schedule">
                View Schedules
              </Button>
            </Link>
            <Link to={`/viewBookings`}>
              <Button sx={{ color: "white" }} className="view-booking">
                View Bookings
              </Button>
            </Link>
            <Link to={`/addSeats`}>
              <Button sx={{ color: "white" }} className="view-booking">
                Add Seats
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AdminPage);
