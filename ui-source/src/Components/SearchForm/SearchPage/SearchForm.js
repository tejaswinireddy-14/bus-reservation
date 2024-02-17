import {
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./SearchForm.css";
import React from "react";
import withRouter from "../../Authentication/WithRouter";

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      stopName: [],
      time: "",
      stopSeq: "",
      route: "",
      origin: "",
      destination: "",
      date: "",
      dest: [],
    };
  }

  changeDate = (event) => {
    console.log(event.toDate());
    console.log(event.format("DD-MM-YYYY"));
    this.setState({ ...this.state, date: event.format("DD-MM-YYYY") });
    // localStorage.setItem("date", {...this.state, date: event.format("DD-MM-YYYY") });
  };

  componentDidMount() {
    this.apiGet();
  }

  handleOriginChange = (event) => {
    console.log(event.target.value);
    this.setState({
      origin: event.target.value,
    });
    localStorage.setItem("origin", event.target.value);
  };

  handleDestinationChange = (event) => {
    console.log(event.target.value);
    this.setState({
      destination: event.target.value,
    });
    localStorage.setItem("destination", event.target.value);

  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.origin !== this.state.origin) {
      this.apiDest();
    }
  }

  apiGet = async () => {
    const response = await fetch(
      "http://localhost:9090/get/routeStop",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await response.json();
    let stopNames = [];
    data.forEach((element) => {
      stopNames.push(element.stopName);
    });
    let originStops = [...new Set(stopNames)];

    // console.log(stopNames);
    this.setState({ stopName: originStops });
    this.setState({ id: data.id });
    this.setState({ stopSeq: data.stopSeq });
    this.setState({ route: data.route });
    this.setState({ time: data.time });
  };

  apiDest = async () => {
    console.log(this.state.origin);
    if (localStorage.getItem("origin")) {
      const response = await fetch(
        `http://localhost:9090/destination?origin=${encodeURIComponent(
          localStorage.getItem("origin")
        )}`,

        {
          mode: "cors",

          headers: {
            "Access-Control-Allow-Origin": "*",

            "Content-Type": "application/json",
          },

          method: "GET",
        }
      );
      const data = await response.json();

      // console.log(data);
      this.setState({
        dest: data,
      });
    }
  };

  states = {
    startDate: new Date(),
    usersCollection: [],
  };
  handleChange = (date) => {
    console.log(date);
    this.setState({
      date: date,
    });
  };

  onsubmit = (e) => {
    e.preventDefault();
    let correctDate = new Date(this.state.date).toLocaleDateString();
    localStorage.setItem('date',correctDate)
    this.props.router.navigate(
      `/Schedules`
      //  ?origin=${this.state.origin}&destination=${this.state.destination}&date=${correctDate}
      // `
    );
    // console.log("updateSchedule:", this.props.updateScheduleResults);
    // this.props.updateScheduleResults(this.state.origin, this.state.destination, new Date(this.state.date).toLocaleDateString());
  };

  render() {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="landingpage">
          <div className="source">
            <FormControl
              sx={{ minWidth: "210px" }}
              // variant="filled"
              size="medium"
            >
              <InputLabel id="demo-simple-select-label">
                <LocationCityIcon />
                Origin
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="origin"
                value={this.state.origin}
                label="Origin"
                onChange={this.handleOriginChange}
              >
                
                {this.state.stopName &&
                  this.state.stopName.map((element) => (
                    <MenuItem value={element}>{element}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div className="destination">
            <FormControl sx={{ minWidth: "210px" }} size="">
              <InputLabel id="demo-simple-select-label">
                {" "}
                <LocationCityIcon />
                Destination
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="destination"
                value={this.state.destination}
                label="Destination"
                onChange={this.handleDestinationChange}
              >
                {this.state.dest &&
                  this.state.dest.map((element) => (
                    <MenuItem classes={"destination-items"} value={element}>
                      {element}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* </form> */}
          </div>

          <div className="date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                variant="outlined"
                label="Select Date"
                minDate={moment()}
                value={this.state.date}
                onChange={this.handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        
        </div>
        <div className="submit">
          <Button variant="contained" onClick={this.onsubmit}>
            Search Bus
          </Button>
        </div>
      </Box>
    );
  }
}
export default withRouter(SearchForm);
