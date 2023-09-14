import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message'
const Messages = () => {
   

  //Creating this messages to fetching the data from the chat Collections 
  //Which is ChatCombined id and messages 
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext);

  
  useEffect(() => {
     
     const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc) =>{
       
       doc.exists() && setMessages(doc.data().messages) //messages is from database that we create in firestore
     })
  
    return () => {
      unSub();
    };
  }, [data.chatId]);
  
 
  console.log(messages)


  return (
    <div className='messages'>
      
       {messages.map((m)=>(
         

            //message passing as prop we passed in message component 
           <Message message = {m} key={m.id} />
       ))}
    
     
       
    </div>
  );
};

export default Messages;