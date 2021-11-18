import React, {useState} from "react"
import "./profile.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { IoHomeOutline, IoCompassOutline, IoChatbubbleEllipsesOutline, IoHeartOutline, IoSettingsOutline } from "react-icons/all";
import logo from './picogramlogo.png'
import photo from './profilepic.jpeg'


const Profile = () => {


return(
<body>
<div className = "profile"> 
    <div className = "part1">
        <img src={logo} class="logo" />
        <div className = "icons">
            <button className = "iconText">
                <IoHomeOutline size = {40}></IoHomeOutline>
                <h1 className = "text">Home</h1>
            </button>
            <button className = "iconText">
                <IoCompassOutline size =  {40}></IoCompassOutline>
                <h1 className = "text">Explore</h1>
            </button>
            <button className = "iconText">
                <IoChatbubbleEllipsesOutline size = {40} ></IoChatbubbleEllipsesOutline>
                <h1 className = "text">Messages</h1>
            </button>
            <button className = "iconText">
                <IoHeartOutline size = {40}></IoHeartOutline>
                <h1 className = "text">Notifications</h1>
            </button>
            <button className = "iconText">
                <IoSettingsOutline size = {40}></IoSettingsOutline>
                <h1 className = "text">Settings</h1>
            </button>


        </div>
        <button className = "userProfile">
            <img src = {photo} class = "profilepic"/>
            <div className = "userInfo">
                <p className = "userProfileText" style = {{fontWeight : "bold"}}>Full Name</p>
                <p className = "userProfileText" style = {{fontStyle : "italic"}}>@username</p>
            </div>
        </button>
        <input type="submit" value = "Logout" class="logout"  />
    </div>
    <div className = "part2">
        <div className = "profileHeader" >
            <div className = "pictureProfile">
                <img src = {photo} class = "profilepic" style = {{height : "170px", width : "170px"}}/>
                <div className = "usernamePostnumbers">
                    <h1 className = "text" style = {{marginLeft:"15px"}}>@username</h1>
                    <div className = "postsFollowers">
                        <p className = "pText">-- posts</p>
                        <p className = "pText">-- followers</p>
                        <p className = "pText">-- following</p>
                    </div>
                    <div className = "editSettings">
                        <input type = "submit" value = "Edit Profile" className ="logout" 
            style = {{backgroundColor:"rgb(125, 51, 194)", border:"2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", width: "285px" }}/>
                        <input type = "submit" value = "Settings" className ="logout" 
            style = {{backgroundColor:"rgb(125, 51, 194)", border:"2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", width:"285px" }}/>
                    </div>
                </div>

            </div>
            <div className = "nameBio">
                <h2 className = "text2">Full name</h2>
                <p>bio.............</p>
            </div>
        </div>
        <div className = "allPosts">

        </div>

    </div>
    <div className = "part3">
        <input type = "search" placeholder = "Search" className = "search"/>
        <div className = "suggested">
           
                <h1 className = "sugText">Suggested for you</h1>
                <button className = "userProfile" style = {{marginTop: "20px", marginLeft: "17%"}}>
                    <img src = {photo} class = "profilepic2"/>
                    <div className = "userInfo">
                        <p className = "userProfileText2" style = {{fontWeight : "bold"}}>Full Name</p>
                        <p className = "userProfileText2" style = {{fontStyle : "italic"}}>@username</p>
                    </div>
                </button>
                <button className = "userProfile" style = {{marginTop: "20px", marginLeft: "17%"}}>
                    <img src = {photo} class = "profilepic2"/>
                    <div className = "userInfo">
                        <p className = "userProfileText2" style = {{fontWeight : "bold"}}>Full Name</p>
                        <p className = "userProfileText2" style = {{fontStyle : "italic"}}>@username</p>
                    </div>
                </button>
                <button className = "userProfile" style = {{marginTop: "20px", marginLeft: "17%"}}>
                    <img src = {photo} class = "profilepic2"/>
                    <div className = "userInfo">
                        <p className = "userProfileText2" style = {{fontWeight : "bold"}}>Full Name</p>
                        <p className = "userProfileText2" style = {{fontStyle : "italic"}}>@username</p>
                    </div>
                </button>
                <button className = "userProfile" style = {{marginTop: "20px", marginLeft: "17%"}}>
                    <img src = {photo} class = "profilepic2"/>
                    <div className = "userInfo">
                        <p className = "userProfileText2" style = {{fontWeight : "bold"}}>Full Name</p>
                        <p className = "userProfileText2" style = {{fontStyle : "italic"}}>@username</p>
                    </div>
                </button>
               
            
        </div>
        <input type = "submit" value = "+ create post" className ="logout" 
        style = {{backgroundColor:"rgb(125, 51, 194)", border:"2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", marginTop: "37%"}}/>
    </div>
</div>
</body>
)}

export default Profile