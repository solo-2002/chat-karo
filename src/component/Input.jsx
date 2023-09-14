import React, { useContext, useState } from 'react'
import attach from "../img/attach.png"
import addfile from "../img/addfile.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, /*storage*/ } from '../firebase'
import{v4 as uuid} from "uuid"
//import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


const Input = () => {


  /* We are writing two UseState one is for Text and another is for Image  */
 
    const [text,setText] = useState("");
    const[img,setImg] = useState(null);
 
  /* we need currentUser*/
  const {currentUser}  = useContext(AuthContext)

  //ChatContext is because we are going to need another user 
  const {data}  = useContext(ChatContext)

  
  const handleSend = async () =>{
      
/* Checking if img present or text then we send according to it  */

      if(img){  
             
          console.log("This is not working right now ")
      /*  const storageRef = ref(storage, uuid() );

        const uploadTask = uploadBytesResumable(storageRef, img);
        
      

        uploadTask.on(
          (error) =>{

          },

          () =>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                  await updateDoc(doc(db,"chats",data.chatId),{
                      
                    messages :arrayUnion({
                        id :uuid(),
                        text,
                        senderId :currentUser.uid,
                        data : Timestamp.now(),
                        img :downloadURL,
                    }),
                     
                  });
                 
             });
                 
               
          }



        );
       */ 

      }else{
           
        /*using fireBaseFunction arrayUnion to update the Array */
        await updateDoc(doc(db,"chats",data.chatId),
        {
              messages : arrayUnion({
                   
                 id :uuid(),
                 text,
                 senderId:currentUser.uid,
                 date:Timestamp.now(),
                 /*Not using server TimeStamp instead we are using normal TimeStamp */
              })
        });
      }

  //We are updating last message and date in users chat which is show in search bar 
  //We need to sort the date hence we see new msg first

      await updateDoc(doc(db,"usersChat",currentUser.uid),{
         [data.chatId + ".lastMessage"]:{
            text,
         },

         [data.chatId+ ".date"]: serverTimestamp(),
      });

      /*why two because it for both the users  */
      await updateDoc(doc(db,"usersChat",data.user.uid),{
        [data.chatId + ".lastMessage"]:{
           text,
        },

        [data.chatId+ ".date"]: serverTimestamp(),
     });
      setText("") /*After sending the text and the image we going to delete it  */
      setImg(null)
  };


  return (
    <div className='input'>
      <input
       type="text" 
       placeholder='Type Something.......' 
       onChange={event=>setText(event.target.value)}

       value ={text}
       /*after sending we are removing send text with text normal */
       /> {/*on Change is basically changing current state of the input */}
      <div className="send">
      
        <img src={attach} alt="" />
        <input type="file" style ={{display:"none"}} id  ="file" onChange={event=>setImg(event.target.files[0])}    />
        <label htmlFor="file">
          <img src={addfile} alt="" />
        </label>
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input