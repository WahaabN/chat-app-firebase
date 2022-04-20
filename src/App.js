import logo from "./logo.svg";
import "./App.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile

} from "firebase/auth";

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "./firebase-config";
import { getDefaultNormalizer } from "@testing-library/react";
import { useState, useEffect } from "react";
import ChatApp from "./Components/ChatApp";

const auth = getAuth(app);
const db = getFirestore(app);

function App() {

  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const [messages, setMessages] = useState([]);
  const colRef = collection(db, "messages");
  const q = query(colRef, orderBy("createdAt"));

  const [inputValue, setInputValue] = useState("");

  const[signInEmail, setSignInEmail] = useState("");
  const[signInPassword, setSignInPassword] = useState("");

  useEffect(
    () =>
      onSnapshot(q, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  
  const handleEmailInput = (e) => {
    setSignInEmail(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setSignInPassword(e.target.value);
  }
  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }
  const signUpWithEmail = (email, password, username) => {

    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // ...
      }).then(() => {
       updateProfile(auth.currentUser, {
         displayName: username
       })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        window.alert(email + " " + password);
        // ..
      });

    
  };

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  
  const userSignOut = () => {
    signOut(auth);
  }
  const addMessage = (message) => {
    console.log(message);

    if (message === null || message.match(/^ *$/) !== null) {
      window.alert("enter a message");
    } else {
      const docRef = addDoc(collection(db, "messages"), {
        message: message,
        createdAt: Timestamp.now(),
        createdById: user.uid,
        createdByUserName: user.displayName
      });

      setInputValue("");
    }
  };
    const handleUserInput = (e) => {
      setInputValue(e.target.value);
    }
  return (
    <div className="App">
      {user ? (
        <ChatApp userSignOut = {userSignOut} handleUserInput = {handleUserInput} inputValue = {inputValue} user={user} addMessage={addMessage} messages={messages} />
      ) : (
      
        <div className="login-page">
            
            <div className="form sign-up-form" >
              <form action="javascript:void(0);">
                <input placeholder="Username" id="sign-up-username"></input>
                  <input placeholder = "Email" id="sign-up-email"></input>
                  <input type = "password" placeholder = "Password" id="sign-up-password"></input>
                
                  
              <button onClick={() => signUpWithEmail(document.getElementById("sign-up-email").value, document.getElementById("sign-up-password").value, document.getElementById("sign-up-username").value)}>Sign Up</button>
            </form>
            </div>
            
            


           <div className="form sign-in-form"> 
            
            <form action="javascript:void(0);">
                <input placeholder="Email" value={signInEmail} onChange = {handleEmailInput}></input>
                <input placeholder="Password" type = "password" value={signInPassword} onChange = {handlePasswordInput}></input>
                <button onClick={() => signInWithEmail(signInEmail, signInPassword)}>Sign in</button>
            </form>
            </div>

            <div className="google-btn-container"><button className="login-with-google-btn" onClick={() => signin()}>Sign in with Google</button></div>
        </div>
     
      )}
    </div>
  );
}

export default App;
