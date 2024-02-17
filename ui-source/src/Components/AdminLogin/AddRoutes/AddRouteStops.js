import React, { Component } from "react";
import { Link, Router } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel ,Button} from "@mui/material";
import withRouter from "../../Authentication/WithRouter";

 class RouteStop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      stop_name: "",
      stop_seq: "",
      route: {
        id: "",
      },
      routeId: [],
      time: "",
      fare: "",
      stop_lat: "",
      stop_long: "",
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSeq = this.handleChangeSeq.bind(this);
    this.handleChangeRoute = this.handleChangeRoute.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeFare = this.handleChangeFare.bind(this);
    this.handleChangeLat = this.handleChangeLat.bind(this);
    this.handleChangeLong = this.handleChangeLong.bind(this);
  }

  handleChangeName(e) {
    this.setState({ stop_name: e.target.value });
  }
  handleChangeLat(e) {
    this.setState({ stop_lat: e.target.value });
  }
  handleChangeLong(e) {
    this.setState({ stop_long: e.target.value });
  }
  handleChangeFare(e) {
    this.setState({ fare: e.target.value });
  }
  handleChangeTime(e) {
    this.setState({ time: e.target.value });
  }

  handleChangeSeq(e) {
    this.setState({ stop_seq: e.target.value });
  }

  handleChangeRoute(e) {
    console.log(e.target.value);
    this.setState({
      route: {
        id: e.target.value,
      },

      
    });
  }
  _;
  submituserRegistrationForm = (e) => {
    e.preventDefault();

    let loginUser = {
      stopname: this.state.stop_name,
      stopseq: this.state.stop_seq,
      route: this.state.route,
      fare: this.state.fare,
      time: this.state.time,
      stopLat: this.state.stop_lat,
      stopLong: this.state.stop_long,
    };
    console.log(loginUser);
    this.apiPost();
    //  this.props.router.navigate("/addSchedules");

    // this.apiGet();
  };
  componentDidMount() {
    this.apiGet();
  }
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
    console.log(this.state.routeId);
  };

  apiPost = async () => {
    const response = await fetch(
      "http://localhost:9090/routeStop",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          stopName: this.state.stop_name,
          stopSeq: this.state.stop_seq,
          stopLat: this.state.stop_lat,
          stopLong: this.state.stop_long,
          time: this.state.time,
          fare: this.state.fare,
          route: this.state.route,
        }),
      }
    );
    this.setState({
      stop_name: "",
      stop_seq: "",
      route: {
        id: "",
      },
      time: "",
      fare: "",
      stop_lat: "",
      stop_long: "",
    });
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
        <div>
          <h2 className="text-center">Add Route Stops</h2>
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label=" Stop Name"
            type="text"
            value={this.state.stop_name}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeName}
          />

          <TextField
            id="filled-password-input"
            label=" Stop Sequence"
            type="text"
            value={this.state.stop_seq}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeSeq}
          />
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label=" Stop Latitude"
            type="text"
            value={this.state.stop_lat}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeLat}
          />
          <TextField
            id="filled-password-input"
            label=" Stop Longitude"
            type="text"
            value={this.state.stop_long}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeLong}
          />
        </div>
        <TextField
          id="filled-password-input"
          label="Time"
          type="text"
          value={this.state.time}
          autoComplete="current-name"
          // variant="filled"
          onChange={this.handleChangeTime}
        />
        <TextField
          id="filled-password-input"
          label="Fare"
          type="text"
          value={this.state.fare}
          autoComplete="current-name"
          // variant="filled"
          onChange={this.handleChangeFare}
        />
        <div>
          <FormControl
            sx={{ minWidth: "220px" }}
            // variant="filled"
            size="medium"
          >
            <InputLabel id="demo-simple-select-label">
              {/* <LocationCityIcon /> */}
              Route Id
            </InputLabel>
            <Select
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
        <div>
          <Button
            style={{
              width: " 10%",

              marginTop: "1.5%",
            }}
            variant="contained"
            onClick={this.submituserRegistrationForm}
          >
            Submit
          </Button>
        </div>
      </Box>
    );
   }}
export default withRouter(RouteStop); 

// import { Button, ButtonBase } from "@mui/material";
// import React from "react";
// // import './styles.css'

// class RouteStops extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formValues: [
//         {
//           stopName: "",
//           stopSeq: "",
//           stopLat: "",
//           stopLong: "",
//           stopTime: "",
//           stopFare: "",
//           route: {
//             id: "",
//           },
//         },
//       ],
//       routeId: [],
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   apiPost = async () => {
   
//    this.state.formValues.map((element) => {
//     const response =  fetch(
//       "http://localhost:9090/routeStop",

//       {
//         mode: "cors",

//         headers: {
//           "Access-Control-Allow-Origin": "*",

//           "Content-Type": "application/json",
//         },

//         method: "POST",
//         body: JSON.stringify({

//           stopName: element.stopName,
//           stopSeq: element.stopSeq,
//           stopLat: element.stopLat,
//           stopLong: element.stopLong,
//           time: element.stopTime,
//           fare: element.stopFare,
//           route: element.route,
//         }),
//       }
//     );
//     console.log(this.state.formValues.stopName);})

//     // this.setState({
//     //   formValues:""
//     // });
//   };

//   apiGet = async () => {
//     const result = await fetch(
//       "http://localhost:9090/get/route",

//       {
//         mode: "cors",

//         headers: {
//           "Access-Control-Allow-Origin": "*",

//           "Content-Type": "application/json",
//         },

//         method: "GET",
//       }
//     );
//     const data = await result.json();
//     console.log(data);
//     let routes = [];
//     data.forEach((element) => {
//       routes.push(element.id);
//     });
//     console.log(routes);

//     this.setState({ routeId: routes });
//     console.log(this.state.routeId);
//   };
//   componentDidMount() {
//     this.apiGet();
//     this.apiPost()
//   }

//   handleChange(i, e) {
//     let data = [...this.state.formValues];
//     data[i][e.target.name] = e.target.value;
    
//     this.setState({formValues:data})
//   }

//   addFormFields() {
//     this.setState({
//       formValues: [
//         ...this.state.formValues,
//         {
//           stopName: "",
//           stopSeq: "",
//           stopLat: "",
//           stopLong: "",
//           stopTime: "",
//           stopFare: "",
//           route: {
//             id: "",
//           },
//         },
//       ],
//       routeId: [],
//     });
  
   
//   }

//   removeFormFields(i) {
//     let data =[... this.state.formValues];
//     data.splice(i, 1);
//     this.setState({ formValues:data });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     alert(JSON.stringify(this.state.formValues));
//     this.apiPost();
   
//   }

//   render() {
//     return (
//       //   <form  onSubmit={this.handleSubmit}>
//       //     {this.state.formValues.map((element, index) => (
//       //       <div className="form-inline" key={index}>
//       //         <label>Stop Name</label>
//       //         <input type="text" name="name" value={element.stopName || ""} onChange={e => this.handleChange(index, e)} />
//       //         <label>Stop Seq</label>
//       //         <input type="text" name="email" value={element.stopSeq || ""} onChange={e => this.handleChange(index, e)} />
//       //         <label>Stop Lat</label>
//       //         <input type="text" name="email" value={element.stopLat || ""} onChange={e => this.handleChange(index, e)} />
//       //         <label>Stop Long</label>
//       //         <input type="text" name="email" value={element.stopLong || ""} onChange={e => this.handleChange(index, e)} />
//       //         <label>Stop Fare</label>
//       //         <input type="text" name="email" value={element.stopFare || ""} onChange={e => this.handleChange(index, e)} />
//       //         <label>Stop Time</label>
//       //         <input type="text" name="email" value={element.stopTime || ""} onChange={e => this.handleChange(index, e)} />

//       //         {
//       //           index ?
//       //             <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button>
//       //           : null
//       //         }
//       //       </div>
//       //     ))}
//       //     <div className="button-section">
//       //         <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
//       //         <button className="button submit" type="submit">Submit</button>
//       //     </div>
//       // </form>

//       <Box
//         component="form"
//         sx={{
//           "& .MuiTextField-root": { m: 1, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <div>
//           <h2 className="text-center">Add Route Stops</h2>
//         </div>
//         {this.state.formValues.map((element, index) => (
//           <div>
//             <div>
//               <TextField
//               name="stopName"
//                 id="filled-password-input"
//                 label=" Stop Name"
//                 type="text"
//                 value={element.stopName}
//                 autoComplete="current-name"
//                 // variant="filled"
//                 onChange={(e) => this.handleChange(index, e)}
//               />

//               <TextField
//               name="stopSeq"
//                 id="filled-password-input"
//                 label=" Stop Sequence"
//                 type="text"
//                 value={element.stopSeq}
//                 autoComplete="current-name"
//                 // variant="filled"
//                 onChange={(e) => this.handleChange(index, e)}
//               />
//             </div>
//             <div>
//               <TextField
//               name="stopLat"
//                 id="filled-password-input"
//                 label=" Stop Latitude"
//                 type="text"
//                 value={element.stopLat}
//                 autoComplete="current-name"
//                 // variant="filled"
//                 onChange={(e) => this.handleChange(index, e)}
//               />
//               <TextField
//               name="stopLong"
//                 id="filled-password-input"
//                 label=" Stop Longitude"
//                 type="text"
//                 value={element.stopLong}
//                 autoComplete="current-name"
//                 // variant="filled"
//                 onChange={(e) => this.handleChange(index, e)}
//               />
//             </div>
//             <TextField
//             name="stopTime"
//               id="filled-password-input"
//               label="Time"
//               type="text"
//               value={element.stopTime}
//               autoComplete="current-name"
//               // variant="filled"
//               onChange={(e) => this.handleChange(index, e)}
//             />
//             <TextField
//             name="stopFare"
//               id="filled-password-input"
//               label="Fare"
//               type="text"
//               value={element.stopFare}
//               autoComplete="current-name"
//               // variant="filled"
//               onChange={(e) => this.handleChange(index, e)}
//             />
//             <div>
//               <FormControl sx={{ minWidth: "220px" }} size="medium">
//                 <InputLabel id="demo-simple-select-label">Route Id</InputLabel>
//                 <Select
//                 name="route"
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={element.route}
//                   label="Select Route Id"
//                   onChange={(e) => this.handleChange(index, e)}
//                 >
//                   {this.state.routeId &&
//                     this.state.routeId.map((element) => (
//                       <MenuItem value={element}>{element}</MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//             </div>
//             {index ? (
//               <Button
//                 type="button"
//                 className="button remove"
//                 onClick={() => this.removeFormFields(index)}
//               >
//                 Remove
//               </Button>
//             ) : null}
//           </div>
//         ))}

//         <div className="button-section">
//           <Button
//             className="button add"
//             type="button"
//             onClick={() => this.addFormFields()}
//           >
//             Add
//           </Button>
//           <Button 
//           sx={
//             {
//               width: " 10%",
  
//               marginTop: "1%",
//             }
//           }
//           onClick={()=>this.apiPost()}
//           className="button submit" 
//           variant="contained"
//           type="submit">
//             Submit
//           </Button>
//         </div>
//       </Box>
//     );
//   }
// }
// export default RouteStops;
