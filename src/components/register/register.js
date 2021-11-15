import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { FaUserAlt, FaKey, FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle } from "react-icons/fa";
//import blue from './blue.png'
import logo from './picogramlogo.png'
import bg from './bg2.png'
import vector from './vector.png'

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        // console.log(name, value)
        setUser({
            ...user, //modifies one and others remain same
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            //alert("posted")
            axios.post("http://localhost:9002/register", user)
            .then (res =>{
                alert(res.data.message)
                history.push("/login")

            } )
        }
        else{
            alert("invalid input")
        }
    }

     return (
    //     <div className="register">
    //         {console.log("User", user)}
    //         <h1>Register</h1>
    //         <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
    //         <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
    //         <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
    //         <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
    //         <div className="button" onClick={register} >Register</div>
    //         <div>or</div>
    //         <div className="button"onClick={() => history.push("/login")}>Login</div>
    //     </div>
    // )

    <div class="container">
    <img src={bg} class="bg" />

    <div class="form-container">
        <div className="login">
            <img src={vector} class="vector" />
            {console.log("User", user)}
            <form action="" class="sign-in-form">
                <img src={logo} class="logo" />
                <h2 class="title">Sign In</h2>
                <div class="input-field" >
                    <FaUserAlt > </FaUserAlt>
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
                </div>
                <div class="input-field">
                    <FaKey ></FaKey>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                </div>
                
                <input type="submit" value="Login" class="btn solid" onClick={login} />

                <p class="social-text"> Or sign in with social platforms</p>
                <div class="social-media">
                    <a href="#" class="social-icon">
                        <FaFacebookF></FaFacebookF>
                    </a>
                    <a href="#" class="social-icon">
                        <FaGoogle></FaGoogle>
                    </a>
                    <a href="#" class="social-icon">
                        <FaLinkedinIn></FaLinkedinIn>
                    </a>
                    <a href="#" class="social-icon">
                        <FaTwitter></FaTwitter>
                    </a>
                </div>

                <input type="submit" value="Don't have an account? Sign Up?" class="signup" onClick={() => history.push("/register")} />

            </form>

        </div>
    </div>
</div>

)

}
export default Register