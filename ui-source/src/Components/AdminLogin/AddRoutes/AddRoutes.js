import React, { Component } from "react";
import { Link, Router } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import withRouter from "../../Authentication/WithRouter";

 class AddRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      route_id: "",
      route_name: "",
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);

    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }

  handleChangeName(e) {
    this.setState({ route_name: e.target.value });
  }
  handleChangeId(e) {
    this.setState({ route_id: e.target.value });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    let loginUser = {
      routename: this.state.route_name,
      routeid: this.state.route_id,
    };
    console.log(loginUser);

    this.apiGet();
    this.props.router.navigate(`/addStops`);
  }
  apiGet = async () => {
    const response = await fetch(
      "http://localhost:9090/route",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          id: this.state.route_id,
          routeName: this.state.route_name,
        }),
      }
    );
    const data = await response.json();

    this.setState({ route_name: data.route_name });
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
          <h2 className="text-center">Add Routes</h2>
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Enter Route Name"
            type="text"
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeName}
          />
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Enter Route Id"
            type="text"
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeId}
          />
        </div>

        <div>
          {/* <Link to ={`/addStops`}> */}
          <Button
            style={{
              width: " 12%",
              marginTop: "0.8%",
            }}
            variant="contained"
            // variant="contained"
            // color="success"
            onClick={this.submituserRegistrationForm}
          >
            Add 
          </Button>
          {/* </Link> */}
        </div>
      </Box>
    );
  }
}
export default withRouter(AddRoute);