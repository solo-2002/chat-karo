import { doc, onSnapshot } from 'firebase/firestore';
import React,{useEffect, useState} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Chats = () => {


  const [chats, setChats] = useState([])

  const { currentUser }  = useContext(AuthContext) ;
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {

    //We are using getChats function because at first we dont have any user chat hence it is giving error

const getChats =() => {  
    const unsub = onSnapshot(doc(db, "usersChat",currentUser.uid ), (doc) => {
         
        setChats(doc.data())
      
});  

    return() =>{
      unsub();
    };
  } 


  //It is Saying if we have currentUser id then we are going to call this function 
     currentUser.uid && getChats()   
 
  },[currentUser.uid])
   
  /* u -> user passed from handleSelect on Click function which includes
     userInfo like id , image and display Name */
  const handleSelect = (u) =>{
      
      dispatch({type :"CHANGE_USER",payload :u})
  }

  return (
    <div className='chats'>

      {/*we are converting the currentUser Object to Array and map with the variable chat s
      so we can access each index of it */}

      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
     
      <div className="userChat" key={chat[0]} onClick={()=> handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
             <span>{chat[1].userInfo.displayName}</span>
             <p>{chat[1].lastMessage?.text}</p>

             {/*Hence we are sorting the messages  */}
        </div>

       </div>
       
       ))}
        
    </div>
  )
}

export default Chats