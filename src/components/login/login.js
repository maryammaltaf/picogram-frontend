import React, { useState } from "react"
import "../register/register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { FaUserAlt, FaKey, FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle } from "react-icons/fa";
//import blue from './blue.png'
import logo from './picogramlogo.png'
import bg from './bg2.png'
import vector from './vector.png'
import { setFollowerCount , setFollowingCount } from "../../store/follow-count/follow-count";
import { useDispatch } from "react-redux";


const Login = ({ setLoginUser }) => {
    console.log("token: ", localStorage.getItem("token"))
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    

    const dispatch = useDispatch();

    const history = useHistory()
    
    const handleChange = e => {
        const { name, value } = e.target
        // console.log(name, value)
        setUser({
            ...user, //modifies one and others remain same
            [name]: value
        })
    }

    const login = (e) => {
        e.preventDefault();
        localStorage.clear();
        console.log("in login")
        const {username, password} = user;
        console.log(username, password)
        axios.post('http://localhost:9000/login', user)
            .then(res => {
                const token = res.data.accessToken
                axios.defaults.headers.common["x-access-token"] = token;
                localStorage.setItem("token", token);
                console.log(res.data.accessToken)
                console.log(res.data)
                
                axios.get(`http://localhost:9000/profile`, user)
                .then(res => {
                    console.log("resData", res.data)
                    console.log("userObj", res.data.userObj)
                    dispatch(setFollowerCount(res.data.userObj.followersCount))
                    dispatch(setFollowingCount(res.data.userObj.followingCount))
                    setLoginUser(res.data.userObj)
                    history.push(`/profile/${res.data.userObj.username}`)
                })
                .catch(err => {
                    console.log("BACKEND ERR:", err.response)
                })
            })
            .catch(err => {
                console.log("BACKEND ERR:", err.response)
            })
    }

    
        


    

    return (
        
        // <div className="login">
        //     {console.log("User", user)}
        //     <h1>Login</h1>
        //     <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
        //     <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password"></input>
        //     <div className="button" onClick={login}>Login</div>
        //     <div>or</div>
        //     <div className="button" onClick={() => history.push("/register")}>Register</div>
        // </div>

        <div class="container">
            <img src={bg} class="bg" />

            <div class="form-container">
                <div className="register">
                    <img src={vector} class="vector" />
                    {console.log("User", user)}
                    <form onSubmit={login} class="sign-in-form">
                        <img src={logo} class="logo" />
                        <h2 class="title">Sign In</h2>
                        <div class="input-field" >
                            <FaUserAlt > </FaUserAlt>
                            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"></input>
                        </div>
                        <div class="input-field">
                            <FaKey ></FaKey>
                            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                        </div>
                        
                        <input className="button"type="submit" value="Login" class="btn solid" />
                        {/* <div className="button" class="btn solid" onClick={login}>LOGIN</div> */}

                        <p class="social-text"> Or sign in with social platforms</p>
                        <div class="social-media">
                            <a href="https://ask.fm/AmmarLakho987" class="social-icon">
                                <FaFacebookF></FaFacebookF>
                            </a>
                            <a href="https://ask.fm/AmmarLakho987" class="social-icon">
                                <FaGoogle></FaGoogle>
                            </a>
                            <a href="https://ask.fm/AmmarLakho987" class="social-icon">
                                <FaLinkedinIn></FaLinkedinIn>
                            </a>
                            <a href="https://ask.fm/AmmarLakho987" class="social-icon">
                                <FaTwitter></FaTwitter>
                            </a>
                        </div>

                        <input type="submit" value="Don't have an account? Sign Up?" class="login" onClick={() => history.push("/register")} />
                    </form>

                </div>
            </div>
        </div>

    )
}
export default Login