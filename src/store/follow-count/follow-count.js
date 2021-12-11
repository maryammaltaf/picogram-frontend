import { combineReducers } from "redux"

const FOLLOWERCOUNT = 'FOLLOWER COUNT'
const FOLLOWINGCOUNT = 'FOLLOWING COUNT'
 
export function setFollowerCount(count){
    return {
        type : FOLLOWERCOUNT,
        count
    }
}

export function setFollowingCount(count){
    return {
        type : FOLLOWINGCOUNT,
        count
    }
}

const defaultCount = {
    followerCount : JSON.parse(localStorage.getItem("user")).followersCount,
    followingCount : JSON.parse(localStorage.getItem("user")).followingCount,
}



function count(state = defaultCount, action){
    switch(action.type){
        case FOLLOWERCOUNT:
            return {
                ...state,
                followerCount : action.count,
                followingCount : state.followingCount
                
                
            };
        case FOLLOWINGCOUNT:
            return {
                ...state,
                followerCount :  state.followerCount,
                followingCount : action.count
               
                
                };
      
            
        default:
            return state
        
               
        }
    
}


export default count;