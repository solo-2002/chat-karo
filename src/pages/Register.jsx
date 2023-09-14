import {React,useState} from 'react'
//import Login from "./Login"
import Add from "../img/add2.png"
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth,storage,db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';



 const Register = () => {
  const [error, seterror] = useState(false);

  const navigate = useNavigate();
  

  const handleSubmit =async (event) =>{
    event.preventDefault()
    const displayName  = event.target[0].value;
    const email  = event.target[1].value;
    const password  = event.target[2].value;
    const file  = event.target[3].files[0];

     try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);



        uploadTask.on(
          
          (error) => {
             
             seterror(true)
          }, 
          () => {
         
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              
                await updateProfile(res.user,{
                   
                  displayName ,
                  photoURL : downloadURL,

                });

                await setDoc(doc(db ,"users",res.user.uid),
                { 
                      displayName,
                      uid:res.user.uid,
                      email,
                      photoURL:downloadURL,
                });

                await setDoc(doc(db,"usersChat",res.user.uid), {} )   

              /*Collecting all the usersChat in the box rightnow it is Empty {} because we dont have any 
                Conversation right now */

                /*when we click the user we need to go to Home page , hence we are using Router - dom  */ 
                navigate('/')
              
            });
          }
        );
       
      
       }catch(error){
     
         seterror(true)
     }
     
  };

  return (
    <div className = "formContainer">
        <div className='formWrapper'>
       
       <span className='titlereg'>Register</span>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display name' />
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <input style={{display:"none"}} type="file" id ="file"  />
                <label  htmlFor="file">
                    <img src={Add} alt="" />
                    <span >Add Your Profile Photo</span>
                </label> 
                <button>Sign Up</button>
                {error && <span>Something Went Wrong</span>}      {/* if Error Occured we used this statement to identify it*/ }
            </form>
            <p>Do you have an Account ?     <Link to={"/login"}>Login</Link></p>
        </div>

    </div>
  )
}

export default Register