import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { FaUserAlt, FaKey, FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
//import blue from './blue.png'
import logo from './picogramlogo.png'
import bg from './bg2.png'
import vector from './vector.png'

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        // console.log(name, value)
        setUser({
            ...user, //modifies one and others remain same
            [name]: value
        })
    }

    const register = (e) => {
        e.preventDefault();
        const { username, email, password, privacy } = user
        if (username && email && password && privacy) {
            axios.post("http://localhost:9000/register", user)
            .then (res =>{
                console.log(res.data);
            })
            .catch(err => {
                console.log("err: ", err.response)
            })
        } 
        else {
            alert("invalid input")
        }
    }

     return (


    <div class="container">
    <img src={bg} class="bg" />

    <div class="form-container">
        <div className="register">
            <img src={vector} class="vector" />
            {console.log("User", user)}
            <form action="" class="register-form">
                <img src={logo} class="logo" />
                <h2 class="title">Sign Up</h2>

                <div class="input-field" >
                    <FaUserAlt > </FaUserAlt>
                    <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleChange}></input>
                </div>

                <div class="input-field" >
                    <FaRegEnvelope > </FaRegEnvelope>
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
                </div>

                <div class="input-field">
                    <FaKey ></FaKey>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                </div>

                <div class="input-field" >
                    <FaUserAlt > </FaUserAlt>
                    <input type="text" name="privacy" value={user.privacy} placeholder="true/false" onChange={handleChange}></input>
                </div>
                
                <input type="submit" value="Sign up" class="btn solid" onClick={register} />

                <p class="social-text"> Or Resigter with social platforms</p>
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

                <input type="submit" value="Already have an account? Sign In" class="login" onClick={() => history.push("/login")} />

            </form>

        </div>
    </div>
</div>

)

}
export default Register