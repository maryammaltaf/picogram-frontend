import React, { useState, useCallback } from "react"
import "./profile.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { IoHomeOutline, IoCompassOutline, IoChatbubbleEllipsesOutline, IoHeartOutline, IoSettingsOutline } from "react-icons/all";
import logo from './picogramlogo.png'
import photo from './profilepic.jpeg'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { followPerson, followingPerson, requestPerson, editProfile } from '../../store/buttons/buttons'
import { setFollowerCount, setFollowingCount } from "../../store/follow-count/follow-count";
import { Router, Route } from "react-router";
import Modal from 'react-modal';
import List from "../list/list";


const url = 'http://localhost:9000';

const Profile = ({ setLoginUser, user }) => {
    const button = useSelector(state => state.button)

    const count = useSelector(state => state.count)



    const dispatch = useDispatch();

    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    let [clickedUser, setClickUser] = useState({
    })

    let [setting, setSetting] = useState('Settings')

    // setClickUser(user)

    console.log("USER: ", user)

    //dispatch(setFollowerCount(user.followersCount));
    // console.log("im here")
    // dispatch(setFollowingCount(user.followingCount));

    console.log("length", Object.entries(user).length)
    if (Object.entries(user).length !== 0) {
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
                dispatch(setFollowerCount(res.data.userObj.followersCount));
                console.log("im here")
                dispatch(setFollowingCount(res.data.userObj.followingCount));
                if (res.data.userObj.followStatus == -1) {
                    dispatch(followPerson('Follow'));
                    setSetting('Message')
                }
                if (res.data.userObj.followStatus == -2) {
                    dispatch(requestPerson('Request sent'));
                    setSetting('Message')
                }
                if (res.data.userObj.followStatus == 1) {
                    dispatch(followingPerson('Following'));
                    setSetting('Message')

                }
                if (res.data.userObj.followStatus == 0) {
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
        dispatch(editProfile('Edit Profile'))
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

    const shouldOpenModal = (e) => {
        e.preventDefault()
        if (button.name == "Following") {
            setModalIsOpen(!modalIsOpen)
        }
        if (button.name == "Edit Profile") {
            setEditModalIsOpen(!editModalIsOpen)
        }

        if ((button.name == "Follow") && (clickedUser.privacy == true)) {
            axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
            const username = clickedUser.username
            console.log("agaye idhar", username)
            axios.post(`${url}/send-request`, null, { params: { username } })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log("err: ", err.response)
                })

            dispatch(requestPerson('Request Sent'))

        }
        if ((button.name == "Follow") && (clickedUser.privacy == false)) {
            axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
            const username = clickedUser.username
            console.log("agaye idhar", username)
            axios.post(`${url}/send-request`, null, { params: { username } })
                .then(res => {
                    console.log("followers right now", res.data.followersCount)
                    dispatch(setFollowerCount(res.data.followersCount));
                })
                .catch(err => {
                    console.log("err: ", err.response)
                })



            dispatch(followingPerson('Following'));

        }
    }

    const unfollowChange = () => {
        if (button.name == "Following") {
            axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
            const username = clickedUser.username
            axios.delete(`${url}/unfollow`, { params: { username } })
                .then(res => {
                    console.log(res.data)
                    dispatch(setFollowerCount(res.data.followersCount));
                })
            setModalIsOpen(modalIsOpen)
            dispatch(followPerson('Follow'));



        }
    }
    const goToList = () => {
        <List/>
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
                    <div className="profileHeader" >
                        <div className="pictureProfile">
                            <img src={photo} class="profilepic" style={{ height: "170px", width: "170px" }} />
                            <div className="usernamePostnumbers">
                                <h1 className="text" style={{ marginLeft: "15px" }}>{clickedUser.username ? clickedUser.username : JSON.parse(localStorage.getItem("user")).username}</h1>
                                <div className="postsFollowers">
                                    <p className="pText">-- posts</p>
                                    {/* <p className = "pText">-- followers</p> */}
                                    {console.log("ClickedUser: ", clickedUser)}
                                    <button className="pText" onClick={goToList}>{count.followerCount} followers</button>
                                    <p className="pText"> {count.followingCount} following</p>
                                </div>

                                {console.log("first stop", modalIsOpen)}
                                <div className="editSettings">
                                    {/* <input type="submit" value={button.name} className="logout"
                                        style={{ backgroundColor: "rgb(125, 51, 194)", border: "2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", width: "285px" }}>
                                    </input> */}

                                    <button type="submit" className="logout" onClick={shouldOpenModal}
                                        style={{ backgroundColor: "rgb(125, 51, 194)", border: "2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", width: "285px" }}>
                                        {button.name}

                                        <Modal isOpen={modalIsOpen} className="modal1">
                                            {console.log("sec stop", modalIsOpen)}
                                            <h2 className='modal-text'>Are you sure you want to unfollow this person?</h2>
                                            {/* <button onClick={ () => setModalIsOpen(modalIsOpen)}>no</button> */}
                                            <button className='modal-btn1' onClick={unfollowChange} >yes</button>
                                            <button className='modal-btn2'> no </button>
                                            {console.log("third stop", modalIsOpen)}
                                        </Modal>

                                        <Modal isOpen={editModalIsOpen} className="modal2">
                                            {console.log("sec stop", editModalIsOpen)}
                                            <div className='modal-all'>
                                                <div className='modal-field'>
                                                    <h2 className='modal-text-field'>Name: </h2>
                                                    <input type="text" className="modal-input" placeholder={JSON.parse(localStorage.getItem("user")).fullname} ></input>
                                                </div>
                                                <div className='modal-field'>
                                                    <h2 className='modal-text-field'>Bio: </h2>
                                                    <input type="text" className="modal-input" placeholder={JSON.parse(localStorage.getItem("user")).bio}></input>
                                                </div>
                                                <div className='modal-field'>
                                                    <h2 className='modal-text-field'>Privacy: </h2>
                                                    <input type="text" className="modal-input" placeholder={JSON.parse(localStorage.getItem("user")).privacy ? "true" : "false"}></input>
                                                </div>
                                            </div>

                                            <button className="modal-btn3"> Save</button>
                                            <button className="modal-btn4" onClick = {() =>setEditModalIsOpen(editModalIsOpen)}> Cancel</button>

                                            {console.log("third stop", editModalIsOpen)}
                                        </Modal>


                                    </button>





                                    <input type="submit" value={setting} className="logout"
                                        style={{ backgroundColor: "rgb(125, 51, 194)", border: "2px solid rgb(125, 51, 194) ", color: "#fff", marginLeft: "17px", width: "285px" }} />
                                </div>
                            </div>

                        </div>
                        <div className="nameBio">
                            <h2 className="text2"> {clickedUser.fullname}</h2>
                            <p>{clickedUser.bio}</p>
                        </div>
                    </div>
                    <div className="allPosts">

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



export default Profile