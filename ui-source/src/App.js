import logo from "./logo.svg";
import "./App.css";
import "./Components/Authentication/Login";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/SIgnUp";
import NavBar from "./Components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchForm from "./Components/SearchForm/SearchPage/SearchForm";
import SearchPage from "./Components/SearchForm/SearchPage/SearchPage";
import BookSeat from "./Components/BookSeat/BookSeat";
import AddRoute from "./Components/AdminLogin/AddRoutes/AddRoutes";
import RouteStop from "./Components/AdminLogin/AddRoutes/AddRouteStops";
import ViewStops from "./Components/AdminLogin/AddRoutes/ViewStops";
import AddSchedule from "./Components/AdminLogin/AddSchedules/AddSchedules";
import ViewSchedules from "./Components/AdminLogin/AddSchedules/ViewSchedules";
import DetailsEntry from "./Components/BookSeat/DetailsEntry";
import AdminPage from "./Components/AdminLogin/AdminPage";
import SchedulePage from "./Components/SearchForm/SearchPage/SchedulePage";
import Booking from "./Components/BookSeat/Booking";
import ViewBookings from "./Components/AdminLogin/ViewBookings/ViewBookings";
import GoogleLocation from "./Components/SearchForm/GoogleMap";

import AddSeat from "./Components/AdminLogin/AddSchedules/AddSeats";

import SIgnUp from "./Components/Authentication/SIgnUp";
import LandingPage from "./Components/Authentication/LandingPage";
import Ticket from "./Components/ManageBooking/MyBooking";
import { useEffect } from "react";
import AdminLogin from "./Components/AdminLogin/ViewBookings/AdminLogin";
import PrintTicket from "./Components/BookSeat/PrintTicket";
import StopsByRoute from "./Components/AdminLogin/AddSchedules/StopsByRoute";
import AddStops from "./Components/AdminLogin/AddRoutes/AddStops";

function App() {
  // useEffect(() => {
  //   console.log(">>>>>>>>>>>>>>> App component ");
  // }, []);
  return (
    <div className="App">
      <LandingPage />
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/Details" element={<DetailsEntry />} />
          <Route path="/Seats" element={<BookSeat />} />
          <Route path="/Booking" element={<Booking />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/myBooking" element={<Ticket />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* <Route exact path="/printTicket" element={<PrintTicket />} /> */}

          <Route path="/SearchForm" element={<SearchForm />} />
          <Route path="/Schedules" element={<SchedulePage />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/" element={<NavBar />}></Route>
          <Route path="/viewAdmin" element={<AdminLogin />} />
          <Route path="/stopsByRoute" element={<StopsByRoute />} />

          
          <Route path="/addRoutes" element={<AddRoute />}></Route>
          <Route path="/addStops" element={<AddStops/>}></Route>
          <Route path="/addSchedules" element={<AddSchedule />}></Route>
          <Route path="/viewStops" element={<ViewStops />}></Route>
          <Route path="/addSeats" element={<AddSeat />}></Route>
          <Route path="/viewSchedules" element={<ViewSchedules />}></Route>
          <Route path="/viewBookings" element={<ViewBookings />}></Route>
          <Route path="/viewLocation" element={<GoogleLocation />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <PrintTicket/> */}
      {/* <GoogleLocation/> */}
    </div>
  );
}

export default App;
