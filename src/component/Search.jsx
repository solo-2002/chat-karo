
import { collection, query, where,getDocs, getDoc, setDoc ,doc, updateDoc, serverTimestamp} from "firebase/firestore";
import React from 'react'
import { useContext } from "react";
import { useState } from 'react'
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext';


const Search = () => {

  const [username,setUsername] = useState("");  //This is useState for the Input user and if the user present  we want to show that hence we need below
  const [user, setUser] = useState(null) ;        //This is for the user present to show the user 
  const [err, setErr] = useState(false);  
  
  
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

   
  /* Handled by Firebase Query 
  function for Search any user */
  const handleSearch = async () =>{       
    
      const q = query(
        collection(db,"users"),
        where("displayName", "==",username)
        ); //Collecting data in users collection if displayName is equal to user 
      
      
      try{
         
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       setUser(doc.data())
    });

      }catch(error){
            setErr(true)
      }
        

  };

  const handleKey = (event) =>{
    event.code ==="Enter" && handleSearch();  //When event is equal to Enter then we just search for the user
  };


  const handleSelect = async () =>
  {
     //check wether the group(chats in firestore) exists, if not create 
       const combinedId  = 
       currentUser.uid > user.uid 
       ? currentUser.uid + user.uid 
        : user.uid + currentUser.uid;
    
        
        
       try{
        //if the chat between the user is exist 
         //we store in the response constant
    
           
         const res = await getDoc(doc(db,"chats",combinedId));
         console.log(res)
        /*If the Response that is chat between the user is not exsit we create the Chats  */
         if(!res.exists()){
           
            //creating chat in chats collection 
             console.log(res)
            
            await setDoc(doc(db,"chats",combinedId), {messages :[] });
            //create user Chats

            /* while Creating user Chats in search bar what we need is 
               *both userID(id)
               *last message {we want to show at bottom of every user}
               *displayName (dn)
               *img 
               *date {we are going to sort the date in this file }
            */
             
         /*   usersChat:{
               joyeId :{              
                 combinedId :{
                       userInfo{
                          dn,img,id 
                       },
                       lastMessage:""       //rightnow we dont have any chat 
                       date:               //it is current date
                 }
               }
            } */ 
            
            await updateDoc(doc(db,"usersChat",currentUser.uid),{
                 [combinedId + ".userInfo"] :{
                    
                    uid : user.uid,
                    displayName : user.displayName,
                    photoURL : user.photoURL,

                 },

                 [combinedId + ".date"] : serverTimestamp() ,   //serverTimeStamp is  function of firebase it calculated time according  to different time zone 

                /* RightNow we are not intialising the bottom msg of the user
                   Because right now we dont have any current user 

                   we are updating it when we Send msg to friend
                */  

            });

            /* We are doing same thing for the other side of  user  */
             
            await updateDoc(doc(db,"usersChat",user.uid),{
              [combinedId + ".userInfo"] :{
                 
                 uid : currentUser.uid,
                 displayName : currentUser.displayName,
                 photoURL : currentUser.photoURL

              },

              [combinedId + ".date"] : serverTimestamp() ,   //serverTimeStamp is  function of firebase it calculated time according  to different time zone 

             /* RightNow we are not intialising the bottom msg of the user
                Because right now we dont have any current user 

                we are updating it when we Send msg to friend
             */  

         });


         }
       }
       catch(err){}
      
    setUser(null);
    setUsername("");
       
     //create user chats
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={(event)=>setUsername(event.target.value)} value = {username} /> 
       </div>
       {err && <span> User Not Found</span> }
      {user && <div className="userChat" onClick={handleSelect} > 
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
             <span>{user.displayName}</span>
        </div>
       </div>}
    </div>
    
  );
};

export default Search;