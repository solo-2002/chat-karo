import React,{useContext} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {

  const {currentUser} = useContext(AuthContext) //Getting Current User Detail with the useContext function
  return (
    <div className='navbar'>
        <span className="logo">SEE Chat</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />  {/*Accessing Each Value that is present in the user Detail */}
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar