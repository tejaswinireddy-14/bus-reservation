import React, { Component } from "react";
import { Link, Router } from "react-router-dom";

// import axios from 'axios';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import withRouter from "./WithRouter";
import { Button } from "@mui/material";
import { InputAdornment,IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


 class Signup extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      user_name: "",
      showPassword:false,

      password: "",
    };

    this.handleChangeName = this.handleChangeName.bind(this);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
      this.handleVisible =
      this.handleVisible.bind(this);
  }
  handleVisible(e){
    e.preventDefault();
    this.setState((previousState) => {
      return {
        showPassword: !previousState.showPassword,
      };
    });
    // this.setState({showPassword:true})
  }

  handleChangeName(e) {
    this.setState({ user_name: e.target.value });
  }

  handleChangeEmail(e) {
    this.setState({ user_email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    let loginUser = {
      username: this.state.user_name,
      mail: this.state.user_email,
      password: this.state.password,
    };
    console.log(loginUser);

    this.apiGet();
    this.props.router.navigate("/SearchForm");
    localStorage.setItem('mail', this.state.user_email)
    localStorage.setItem('password',this.state.password)
    localStorage.setItem('userName',this.state.user_name)
  }
  apiGet = async () => {
    const response = await fetch(
      "http://localhost:9090/users",

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          userName: this.state.user_name,
          userMail: this.state.user_email,
          password: this.state.password,
        }),
      }
    );
    const data = await response.json();

    this.setState({ user_name: "" });
    this.setState({ id: "" });
    this.setState({ user_email: "" });
    this.setState({ password: "" });
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
          <h2 className="text-center">SignUp</h2>
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label=" Name"
            type="text"
            value={this.state.user_name}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeName}
          />
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label=" Email"
            type="text"
            value={this.state.user_email}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeEmail}
          />
        </div>
        <div>
          <TextField
            id="filled-password-input"
            label="Password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangePassword}
            
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleVisible}
                    onMouseDown={this.handleChangePassword}
                  >
                    {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div>
          <div className="submit">
            
              <Button 
              sx={{
                width: " 10%",
                marginTop: "0.08%",
                marginLeft:"-35px"
                // position:"absolute"

              }}
              //  style={{
              //   width: " 10%",
              //   marginTop: "0.3%",
              //   // padding:"1px"
    
              //   // alignItems:"center",
                
              // }}
                variant="contained" onClick={this.submituserRegistrationForm}>Submit</Button>
            
          </div>
          <div className="d-flex justify-content-center links">
                    <Link  to="/login" className="linka">Already Registered? </Link>
                  </div>
        </div>
      </Box>
    );
  }
}
export default withRouter(Signup);
