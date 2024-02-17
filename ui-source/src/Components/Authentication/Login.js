import React from "react";
import { Link, Redirect } from "react-router-dom";

// import { Button, Form, Input, Label, FormGroup } from "reactstrap";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import withRouter from "./WithRouter";
import { Button, Typography } from "@mui/material";

import { InputAdornment,IconButton } from '@mui/material';
// import Visibility from "@material-ui/icons/Visibility";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      
      user_email: "",
      password: "",
      exist:"",
      showPassword:false

    };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
      this.handleVisible =
      this.handleVisible.bind(this);
      this.handleClose =
      this.handleClose.bind(this);

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
  handleClose(e){
    e.preventDefault();
    this.setState({showPassword:false})
  }

handleChangeMail(e){
  this.setState({user_email:e.target.value})
}
handleChangePassword(e){
  this.setState({password:e.target.value})
}
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidUpdate(){
    if(this.state.exist == true ){
      if(this.state.user_email!="tejaswinireddy.g14@gmail.com"){
    this.props.router.navigate("/SearchForm");}
    
 
  else if((this.state.user_email == "tejaswinireddy.g14@gmail.com")&& (this.state.password == "tej1421")){
      this.props.router.navigate("/viewAdmin");
    }}
      
    localStorage.setItem('mail',this.state.user_email)
    
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    this.apiGet();
  //   if(this.state.exist == true ){
  //     if(this.state.user_email!="tejaswinireddy.g14@gmail.com"){
  //   this.props.router.navigate("/SearchForm");
    
  // }
  //  else if((this.state.user_email == "tejaswinireddy.g14@gmail.com")&& (this.state.password == "tej1421")){
  //     this.props.router.navigate("/viewAdmin");
  //   }}
  //   localStorage.setItem('mail',this.state.user_email)
   
    }
  apiGet = async()=>{
    const response = await fetch(
      `http://localhost:9090/exist?email=${encodeURIComponent(this.state.user_email)}&password=${encodeURIComponent(this.state.password)}`,

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    let res = await response.json();
    this.setState({exist:res})
  }
 

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
          <h2 className="text-center">Login</h2>
        </div>

        <div>
          <TextField
          // type={this.state.showPassword ? "text" : "password"}
            id="filled-email-input"
            label="Email"
            type="text"
            autoComplete="current-name"
            // variant="filled"
            onChange={this.handleChangeMail}
          />
        </div>
        <div>
          <TextField
          type={this.state.showPassword ? "text" : "password"}
            id="filled-password-input"
            label="Password"
           
            autoComplete="current-Password"
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
          {/* <Typography align="center"> */}
          <Button
            // style={{
            //   margin: "0 auto",
            //   alignItems: "center",
            //   display: "flex",
            //   height: 50,
            //   textAlign: "center",
            //   fontSize: 25,
            //   width: 200,
            // }}
            style={{
              width: " 10%",
  
              marginTop: "1%",
            }}
            variant="contained"
            color="primary"
            onClick={this.submituserRegistrationForm}
          >
            Submit
          </Button>
          {/* </Typography> */}
          <div className="d-flex justify-content-center mt-3 login_container"
          style={{
            color:"white",
            font:"inherit"
          }}>
            <Link to="/signup" id="Signup-Btn">
              New user?
            </Link>
          </div>
        </div>
      </Box>
    );
  }
}
export default withRouter(Login);
