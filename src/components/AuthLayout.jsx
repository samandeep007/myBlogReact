import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux' //To get the state values
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authentication = true}) { //authentication = true means the page is protected --> we need protected pages for the user to be authenticated
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true); //Setting up a loader state and updating it whenever the page is loading
    const authStatus = useSelector(state => state.auth.isAuthenticated); //Getting the isAuthenticated value from the state

    useEffect(()=>{ 
        //TODO: make it more easy --> check the alternate way to do this
        // let authValue = authStatus === true ? true : false; //If the user is authenticated, then the value of authValue will be true, else false

        if (authentication && authStatus !== authentication) { //If the user is not authenticated and the page is protected --> true && true = true --> we have used this if condition to check if the user is authenticated or not
            navigate("/login");
        } else if(!authentication && authStatus !== authentication){ //If the user is authenticated and the page is not protected --> false && false = false
            navigate("/")
        }
        setLoader(false) //on the basis of loader, we will show the loader or the page
    }, [authStatus, navigate, authentication]) //Whenever the authStatus, navigate or authentication changes, the useEffect will run
  return (
    loader ? <h1>Loading...</h1> : <>{children}</> //If the loader is true, then show the loading text, else show the children
  )
}
