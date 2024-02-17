// import { Button, ButtonBase } from "@mui/material";
import React from "react";
// import './styles.css'
import { Link, Router } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel ,Button} from "@mui/material";
import withRouter from "../../Authentication/WithRouter";

class AddStops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: [
        {
          stopName: "",
          stopSeq: "",
          stopLat: "",
          stopLong: "",
          stopTime: "",
          stopFare: "",
         
          
        },
      ],
      route: {
        id: "",
      },
     
      routeId: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRoute = this.handleChangeRoute.bind(this);
  }
  handleChangeRoute(e) {
    console.log(e.target.value);
    this.setState({
        route: {
            id: e.target.value,
          },
     

      
    });
  }
  apiPost = async () => {
   
   this.state.formValues.map((element) => {
    const response =  fetch(
      "http://localhost:9090/routeStop",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({

          stopName: element.stopName,
          stopSeq: element.stopSeq,
          stopLat: element.stopLat,
          stopLong: element.stopLong,
          time: element.stopTime,
          fare: element.stopFare,
          route: this.state.route,
        }),
      }
    );
    console.log(this.state.formValues.stopName);})

    // this.setState({
    //   formValues:""
    // });
  };

  apiGet = async () => {
    const result = await fetch(
      "http://localhost:9090/get/route",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await result.json();
    console.log(data);
    let routes = [];
    data.forEach((element) => {
      routes.push(element.id);
    });
    console.log(routes);

    this.setState({ routeId: routes });
    // console.log(this.state.routeId);
  };
  componentDidMount() {
    this.apiGet();
    // this.apiPost();
   
  }

  handleChange(i, e) {
    let data = [...this.state.formValues];
    data[i][e.target.name] = e.target.value;
    
    this.setState({formValues:data})
  }

  addFormFields() {
    this.setState({
      formValues: [
        ...this.state.formValues,
        {
          stopName: "",
          stopSeq: "",
          stopLat: "",
          stopLong: "",
          stopTime: "",
          stopFare: "",
         
         
        },
      ],
    //   route:
      
    //   {
    //    id: "",
    //  },
     
    //   routeId: [],
    });
  
   
  }

  removeFormFields(i) {
    let data =[... this.state.formValues];
    data.splice(i, 1);
    this.setState({ formValues:data });
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert(JSON.stringify(this.state.formValues));
    this.apiPost();
       this.props.router.navigate("/addSchedules");
   
  }
//   onSubmit(){
//     this.apiPost()
//   }

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
        <div>
          <h2 className="text-center">Add Route Stops</h2>
        </div>
        {this.state.formValues.map((element, index) => (
          <div>
            <div>
              <TextField
              name="stopName"
                id="filled-password-input"
                label=" Stop Name"
                type="text"
                value={element.stopName}
                autoComplete="current-name"
                // variant="filled"
                onChange={(e) => this.handleChange(index, e)}
              />

              <TextField
              name="stopSeq"
                id="filled-password-input"
                label=" Stop Sequence"
                type="text"
                value={element.stopSeq}
                autoComplete="current-name"
                // variant="filled"
                onChange={(e) => this.handleChange(index, e)}
              />
            </div>
            <div>
              <TextField
              name="stopLat"
                id="filled-password-input"
                label=" Stop Latitude"
                type="text"
                value={element.stopLat}
                autoComplete="current-name"
                // variant="filled"
                onChange={(e) => this.handleChange(index, e)}
              />
              <TextField
              name="stopLong"
                id="filled-password-input"
                label=" Stop Longitude"
                type="text"
                value={element.stopLong}
                autoComplete="current-name"
                // variant="filled"
                onChange={(e) => this.handleChange(index, e)}
              />
            </div>
            <TextField
            name="stopTime"
              id="filled-password-input"
              label="Time"
              type="time"
              value={element.stopTime}
              autoComplete="current-name"
              // variant="filled"
              onChange={(e) => this.handleChange(index, e)}
            />
            <TextField
            name="stopFare"
              id="filled-password-input"
              label="Fare"
              type="text"
              value={element.stopFare}
              autoComplete="current-name"
              // variant="filled"
              onChange={(e) => this.handleChangeRoute(e)}
            />
            <div>
              <FormControl sx={{ minWidth: "220px" }} size="medium">
                <InputLabel id="demo-simple-select-label">Route Id</InputLabel>
                <Select
                // name="route"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.route.id}
                label="Select Route Id"
                onChange={this.handleChangeRoute}
              >
                {this.state.routeId &&
                  this.state.routeId.map((element) => (
                    <MenuItem value={element}>{element}</MenuItem>
                  ))}
               </Select>
              
              </FormControl>
            </div>
            {index ? (
              <Button
                type="button"
                className="button remove"
                onClick={() => this.removeFormFields(index)}
              >
                Remove
              </Button>
            ) : null}
          </div>
        ))}

        <div className="button-section">
          <Button
            className="button add"
            type="button"
            onClick={() => this.addFormFields()}
          >
            Add
          </Button>
          {/* <div>
              <FormControl sx={{ minWidth: "220px" }} size="medium">
                <InputLabel id="demo-simple-select-label">Route Id</InputLabel>
                <Select
                // name="route"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.route.id}
                label="Select Route Id"
                onChange={this.handleChangeRoute}
              >
                {this.state.routeId &&
                  this.state.routeId.map((element) => (
                    <MenuItem value={element}>{element}</MenuItem>
                  ))}
               </Select>
              
              </FormControl> */}
            {/* </div> */}
            <div>
          <Button 
          sx={
            {
              width: " 10%",
  
              marginTop: "1%",
            }
          }
          onClick={this.handleSubmit} 
      
          className="button submit"    
          variant="contained"
          type="submit">
            Submit
          </Button>
          </div>
        </div>
      </Box>
    );
  }
}
export default withRouter(AddStops);
