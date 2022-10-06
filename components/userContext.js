import { useState, createContext } from "react";

export const UserContext = createContext()

export const UserProvider = (props)=>{
    const [userDetails, setUserDetails] = useState([])
    const[mypostedJobs, setMyPostedJobs] = useState(null)
    const [logo, setLogo] = useState("/images/default.png")
    const [customerDetails, setCustomerDetails] = useState(null)
    return(
        <UserContext.Provider value={[userDetails, setUserDetails, mypostedJobs, setMyPostedJobs, logo, setLogo, customerDetails, setCustomerDetails]}>
            {props.children}
        </UserContext.Provider>
    )
}