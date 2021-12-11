import { combineReducers } from "redux"

const FOLLOW = 'FOLLOW'
const FOLLOWING = 'FOLLOWING'
const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
const EDIT_PROFILE = 'EDIT_PROFILE'
 
export function editProfile(button){
    return {
        type : EDIT_PROFILE,
       button 
    }
}

export function followPerson(button){
    return {
        type : FOLLOW,
        button
    }
}

export function followingPerson(button){
    return {
        type : FOLLOWING,
        button
    }
}

export function requestPerson(button){
    return {
        type : FOLLOW_REQUEST,
        button
    }
}

const defaultButton = 
    {
        name : 'Edit Profile',
        classn : 'logout'
    }
;

function button(state = defaultButton, action){
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                name : action.button,
                classn : 'follow'
                
            };
        case FOLLOWING:
            return {
                ...state,
                name : action.button,
                classn : 'following'
                
                };
        case FOLLOW_REQUEST:
            return {
                ...state,
                name : action.button,
                classn : 'followRequest'
                
            };
        case EDIT_PROFILE:
            return {
                ...state,
                name : action.button,
                classn : 'logout'
                
            };
        default:
            return state
        
               
        }
    
}



export default button;