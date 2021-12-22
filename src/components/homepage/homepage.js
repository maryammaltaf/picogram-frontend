import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react"
import "../profile/profile.css"
import logo from '../profile/picogramlogo.png'
import photo from '../profile/profilepic.jpeg'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { followPerson, followingPerson, requestPerson, editProfile } from '../../store/buttons/buttons'
import { Router, Route } from "react-router";
import Modal from 'react-modal';


import { IoHomeOutline, IoCompassOutline, IoChatbubbleEllipsesOutline, IoHeartOutline, IoSettingsOutline } from "react-icons/all";

const url = 'http://localhost:9000';
const Homepage = ({ setLoginUser, user }) => {

    const button = useSelector(state => state.button)

    const dispatch = useDispatch();

    const history = useHistory();


    let [clickedUser, setClickUser] = useState({
    })

    let [setting, setSetting] = useState('Settings')

    // setClickUser(user)

    // const firstUpdate = useRef(true);
    // useLayoutEffect(() => {
    // if (firstUpdate.current) {
    //     allPosts();
    //     firstUpdate.current = false;
    //     return;
    // }
    // });

    useEffect(() => {
        console.log("1")
        allPosts();
        console.log("2")
    });

    console.log("USER: ", user)
    if (!user) {
        console.log("User hai", user)
        localStorage.setItem("user", JSON.stringify(user))
        // localStorage.setItem("clicked", JSON.stringify(user))
        // setClickUser(user)
    }


    //console.log("length", Object.entries(user).length)
    else if (Object.entries(user).length !== 0) {
        console.log("User hai", user)
        localStorage.setItem("user", JSON.stringify(user))
        // localStorage.setItem("clicked", JSON.stringify(user))
        // setClickUser(user)
    }


    const clickUser = (e) => {


        // console.log(e.target.innerHTML);
        const tempClickedUser = getUsernameText(e);
        axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
        axios.get(`${url}/profile/${tempClickedUser}`)
            .then(res => {
                // I FOLLOW THE OTHER PERSON
                setClickUser(res.data.userObj)
                console.log("click1: ", res.data.userObj)
                console.log("click2: ", clickedUser);
                if (res.data.userObj.followStatus === -1) {
                    dispatch(followPerson('Follow'));
                    setSetting('Message')
                }
                if (res.data.userObj.followStatus === 1) {
                    dispatch(followingPerson('Following'));
                    setSetting('Message')
                }
                if (res.data.userObj.followStatus === 0) {
                    dispatch(editProfile('Edit Profile'));
                    setSetting('Settings')
                }


            })
            .catch(err => {
                console.log("err: ", err.response)
            })

    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear();
        setLoginUser({})
        history.push("/")
    }

    const getUsernameText = (e) => {
        let buttonDiv;
        if (e.target.tagName === "P") {
            console.log("PPP")
            buttonDiv = e.target.parentNode.parentNode;
        }
        if (e.target.tagName === "IMG") {
            buttonDiv = e.target.parentNode;
        }

        let pDiv = buttonDiv.getElementsByClassName("usernameText")[0];
        console.log(pDiv.innerHTML);
        return pDiv.innerHTML

    }


    if (Object.entries(clickedUser).length === 0) {
        clickedUser = JSON.parse(localStorage.getItem("user"))
    }


    const allPosts = () => {

        console.log("nahi chal raha")
        const containerDiv = document.getElementsByClassName('posts-container') [0]
        console.log("a", containerDiv)
        let photo2 = "https://res.cloudinary.com/dbxbroqqm/image/upload/v1640124567/halcdizvhi46lmbxr66c.png"
        
        for (let i = 0; i < 10; i++) {
            const singlePost = `
            <div class="post">
                                <div class="poster-details">
                                    <img src=${photo2} class="post-profilepic" />
                                    <p class="poster-name">username</p>
                                </div>
                                <img src=${photo2} class="post-picture" />
                                <div class="post-icons">
                                    <p class="icon-button">069 poeple like this post</p>
                                    <div class="button-display">
                                        <button class="icon-button">
                                            <IoHeartOutline size=${30}></IoHeartOutline>
                                        </button>
                                        <button class="icon-button">
                                            <IoChatbubbleEllipsesOutline size=${30} ></IoChatbubbleEllipsesOutline>
                                        </button>
                                    </div>
                                </div>
                                <div class="post-caption">
                                    <p class="caption-username">username</p>
                                    <p class="caption-caption">caption blah blah blah</p>
                                </div>
                            </div>`
                       
                           containerDiv.insertAdjacentHTML('beforeend', singlePost)
        }
    }

    return (
        <body>
            <div className="profile">

                {/* {console.log(1)} */}
                <div className="part1">
                    <img src={logo} class="logo" />
                    <div className="icons">
                        <button className="iconText">
                            <IoHomeOutline size={40}></IoHomeOutline>
                            <h1 className="text">Home</h1>
                        </button>
                        <button className="iconText">
                            <IoCompassOutline size={40}></IoCompassOutline>
                            <h1 className="text">Explore</h1>
                        </button>
                        <button className="iconText">
                            <IoChatbubbleEllipsesOutline size={40} ></IoChatbubbleEllipsesOutline>
                            <h1 className="text">Messages</h1>
                        </button>
                        <button className="iconText">
                            <IoHeartOutline size={40}></IoHeartOutline>
                            <h1 className="text">Notifications</h1>
                        </button>
                        <button className="iconText">
                            <IoSettingsOutline size={40}></IoSettingsOutline>
                            <h1 className="text">Settings</h1>
                        </button>


                    </div>
                    <button onClick={clickUser} className="userProfile">
                        <img src={photo} class="profilepic" />
                        <div className="userInfo">
                            <p className="userProfileText" style={{ fontWeight: "bold" }}>{JSON.parse(localStorage.getItem("user")).fullname}</p>
                            <p className="userProfileText usernameText" style={{ fontStyle: "italic" }}>{JSON.parse(localStorage.getItem("user")).username}</p>
                        </div>
                    </button>
                    <input type="submit" value="Logout" class="logout" onClick={logout} />
                </div>



                <div className="part2">
                    <div className="posts-container">
                        <div className="post">
                            {/* <div className="poster-details">
                                <img src={photo} class="post-profilepic" />
                                <p className="poster-name">username</p>
                            </div>
                            <img src={photo} class="post-picture" />
                            <div className="post-icons">
                                <p className="icon-button">069 poeple like this post</p>
                                <div className="button-display">
                                    <button className="icon-button">
                                        <IoHeartOutline size={30}></IoHeartOutline>
                                    </button>
                                    <button className="icon-button">
                                        <IoChatbubbleEllipsesOutline size={30} ></IoChatbubbleEllipsesOutline>
                                    </button>
                                </div>
                            </div>
                            <div className="post-caption">
                                <p className="caption-username">username</p>
                                <p className="caption-caption">caption blah blah blah</p>
                            </div> */}
                        </div>
                    </div>
                </div>



                <div className="part3">
                    <input type="search" placeholder="Search" className="search" />
                    <div className="suggested">
                        <h1 className="sugText">Suggested for you</h1>
                        <button onClick={clickUser} className="userProfile" style={{ marginTop: "20px", marginLeft: "17%" }}>
                            <img src={photo} class="profilepic2" />
                            <div className="userInfo">
                                <p className="userProfileText2" style={{ fontWeight: "bold" }}>Full Name</p>
                                <p className="userProfileText2 usernameText" style={{ fontStyle: "italic" }}>huda</p>
                            </div>
                        </button>
                        <button onClick={clickUser} className="userProfile" style={{ marginTop: "20px", marginLeft: "17%" }}>
                            <img src={photo} class="profilepic2" />
                            <div className="userInfo">
                                <p className="userProfileText2" style={{ fontWeight: "bold" }}>Full Name</p>
                                <p className="userProfileText2 usernameText" style={{ fontStyle: "italic" }}>maryam</p>
                            </div>
                        </button>
                        <button onClick={clickUser} className="userProfile" style={{ marginTop: "20px", marginLeft: "17%" }}>
                            <img src={photo} class="profilepic2" />
                            <div className="userInfo">
                                <p className="userProfileText2" style={{ fontWeight: "bold" }}>Full Name</p>
                                <p className="userProfileText2 usernameText" style={{ fontStyle: "italic" }}>ammar2</p>
                            </div>
                        </button>
                        <button onClick={clickUser} className="userProfile" style={{ marginTop: "20px", marginLeft: "17%" }}>
                            <img src={photo} class="profilepic2" />
                            <div className="userInfo">
                                <p className="userProfileText2" style={{ fontWeight: "bold" }}>Full Name</p>
                                <p className="userProfileText2 usernameText" style={{ fontStyle: "italic" }}>ammar3</p>
                            </div>
                        </button>
                    </div>
                    <input type="submit" value="+ create post" className="logout"
                        style={{ backgroundColor: "rgb(125, 51, 194)", border: "2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", marginTop: "37%" }} />
                </div>
            </div>
        </body >

    )
}
export default Homepage