import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react"

import axios from "axios"
import { useHistory } from "react-router-dom"
import { IoHomeOutline, IoCompassOutline, IoChatbubbleEllipsesOutline, IoHeartOutline, IoSettingsOutline } from "react-icons/all";
import logo from './picogramlogo.png'
import photo from './profilepic.jpeg'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { followPerson, followingPerson, requestPerson, editProfile } from '../../store/buttons/buttons'
import { Router, Route } from "react-router";
import Modal from 'react-modal';
import "../list/list.css"

const url = 'http://localhost:9000';
const List = ({ setLoginUser, user, a }) => {

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
    if (firstUpdate.current) {
        toggleTab(1);
        firstUpdate.current = false;
        return;
    }
    });
    const button = useSelector(state => state.button)

    const dispatch = useDispatch();

    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
        const [toggleState, setToggleState] = useState(1);

        const toggleTab = (index) => {

            axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
            if (index === 1) {
                clearAndGetList('followers');
            }
            else if (index === 2) {
                clearAndGetList('following');
            }
            else if (index === 3) {
                const path = window.location.pathname;
                console.log("path",path);
                const username = path.slice(6);
                console.log("asdfgh", username);
                if (username !== JSON.parse(localStorage.getItem("user")).username) {
                    getRequestsList(0);
                }
                else {
                    getRequestsList(1)
                }
            }
            setToggleState(index);
        };


        const getRequestsList = (mode) => {

            let div = document.getElementById('div-requests');
            while(div.firstChild) {
                div.removeChild(div.firstChild);
            }

            if (mode === 0) {
                let textP = document.createElement('p');
                const node = document.createTextNode("You cant see someone else's requests.");
                textP.appendChild(node);
                div.appendChild(textP);
                console.log("MODE  IS 0")
                return;
            }

            axios.get('http://localhost:9000/requests')
            .then(res => {
                console.log(res.data);
                const list = document.createElement('ul');
                for (let person of res.data["requests"]) {
                    console.log('person', person);
                    let divCon = document.createElement('div')
                    divCon.className = "listItem"
                    let item = document.createElement('li');

                    let accButton = document.createElement("BUTTON");
                    accButton.className = "button"
                    accButton.addEventListener('click', () => accRequest(person.user._id, accButton, rejButton, accButton2))

                    let accButton2 = document.createElement("BUTTON");
                    accButton2.innerHTML = "Accepted"
                    accButton2.className = "button2"
                    accButton2.style.visibility = "hidden"

                    let rejButton = document.createElement('BUTTON');
                    rejButton.className = "button"
                    rejButton.addEventListener('click', () => rejRequest(person.user._id, accButton, rejButton, rejButton2))

                    let rejButton2 = document.createElement("BUTTON");
                    rejButton2.innerHTML = "Rejected"
                    rejButton2.className = "button2"
                    rejButton2.style.visibility = "hidden"
                    
                  
                    item.innerHTML = person.user._id;
                    accButton.innerHTML = "Accept"
                    rejButton.innerHTML = "Reject"
                    divCon.appendChild(item)
                    divCon.appendChild(accButton)
                    divCon.appendChild(rejButton)
                    divCon.appendChild(accButton2)
                    divCon.appendChild(rejButton2)
                    
                    console.log("accept", accButton)
                   
                    
                    list.appendChild(divCon);
                }
                div.appendChild(list);
            })
            .catch(err => {
                console.log(err);
            });

        }

        const accRequest = (username , accButton, rejButton, accButton2) => {
            console.log("in the onClick")
            
            axios.post('http://localhost:9000/accept-request', null,  { params: { username } })
            .then(res => {
                console.log(res.data)
                accButton.style.visibility = "hidden"
                rejButton.style.visibility = "hidden"
                accButton2.style.visibility = "visible"
            
                

            }).catch(err => {
                console.log("err: ", err.response)
            })
        }

        const rejRequest = (username , accButton, rejButton, rejButton2) => {
            console.log("in the onClick")
            
            axios.delete('http://localhost:9000/reject-request',  { params: { username } })
            .then(res => {
                console.log(res.data)
                accButton.style.visibility = "hidden"
                rejButton.style.visibility = "hidden"
                rejButton2.style.visibility = "visible"
               
                
            }).catch(err => {
                console.log("err: ", err.response)
            })
        }

        

        const clearAndGetList = (listName) => {
            if (listName !== 'followers' && listName !== 'following') {
                console.log("Invalid list name");
                return;
            }
            let div = document.getElementById('div-' + listName);
            while(div.firstChild) {
                div.removeChild(div.firstChild);
            }
            const path = window.location.pathname;
            console.log("path",path);
            const username = path.slice(6);
            console.log("asdfgh", username);
            axios.get('http://localhost:9000/' + listName,   { params: { username } })
            .then(res => {
                console.log(res.data);
                const list = document.createElement('ul');
                for (let person of res.data[listName]) {
                    console.log('person', person);
                    let item = document.createElement('li');
                   
                    item.innerHTML = person.user._id;
                    list.appendChild(item);
                }
                div.appendChild(list);
            })
            .catch(err => {
                console.log(err);
            });


        }

        let [clickedUser, setClickUser] = useState({
        })

        let [setting, setSetting] = useState('Settings')

        // setClickUser(user)

        console.log("USER: ", user)
        if(!user){
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




        return (
            <body>
                <div className="profile">

                    {console.log(1)}
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
                        
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(1)}
                            >
                                Followers
                            </button>
                            <button
                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(2)}
                            >
                                Following
                            </button>
                            <button
                                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(3)}
                            >
                                Request
                            </button>
                        </div>

                        <div className="content-tabs">
                            <div
                                className={toggleState === 1 ? "content  active-content" : "content"}
                            >
                                <h2>Followers</h2>
                                <hr />
                                <div id="div-followers"></div>
                            </div>

                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"}
                            >
                                <h2>Following</h2>
                                <hr />
                                <div id="div-following"></div>
                            </div>

                            <div
                                className={toggleState === 3 ? "content  active-content" : "content"}
                            >
                                <h2>Request</h2>
                                <hr />
                                <div id="div-requests"></div>
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
            </body>
        )
    }



    export default List