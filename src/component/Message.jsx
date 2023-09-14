import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

 /*Till Now We are Edited last Message and sorted them in order
   
  ->Now we are Managing Text inside the Chat 

  */
//message is passed as prop from the messages component
const Message = ({message}) => {

 
 
  const {currentUser}  = useContext(AuthContext)

  
  const {data}  = useContext(ChatContext)
  



  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, ref]);
 

  

  return (
    <div  ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
     <div className="messageInfo">
      <img
       src={
        message.senderId === currentUser.uid
          ? currentUser.photoURL
          : data.user.photoURL
         }
      alt=""
       />
      <span>Just Now</span>
      </div>
      
      <div className="messageContent">
        <p>{message.text}</p>
       {message.img && <img src={message.img} alt="" />}
      </div>
    </div>

  )
}

export default Message