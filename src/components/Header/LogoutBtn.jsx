import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

export default function LogoutBtn() {

    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout().then(()=>{ //authService.logout() is a promise here, so we can do chaining here
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}
