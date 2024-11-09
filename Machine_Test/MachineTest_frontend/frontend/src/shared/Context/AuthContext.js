import { createContext } from "react";


// STEP: 1 create an Auth Context
export const AuthContext = createContext({

    // based on the functionality to be achived create the fields
    isLoggedIn:false,          //initially user not logged in
    login: ()=>{},
    logout: ()=>{},
    // 
    userId :null

})