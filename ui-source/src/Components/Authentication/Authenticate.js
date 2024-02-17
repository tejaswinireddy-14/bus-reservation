import React from "react";
import Login from "./Login";
import Signup from "./SIgnUp";
const Authenticate = () => {
return(
    <div className="Authenticate"
        aria-labelledby="actions">
             <a class="dropdown-item" href="#">Component={<Login/>}</a>
             <a class="dropdown-item" href="#">Component={<Signup/>}</a> 
    </div>
)
}
export default Authenticate;