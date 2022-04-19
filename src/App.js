import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from './firebase-config';
import { getDefaultNormalizer } from '@testing-library/react';

const auth = getAuth(app);
const db = getFirestore(app)

function App() {
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  
  const colRef = collection(db, 'messages');

  getDocs(colRef).then((snapshot) => {
    let messages = []
    snapshot.docs.forEach((doc) => {
      messages.push({...doc.data() })
      console.log(doc.message()); 
    })
    console.log(messages.message); 
  })

  
  const login = () => {
   
    createUserWithEmailAndPassword(auth, "wahaabnav@gmail.com", "test123")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


  }

  const signin = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div className="App">
       
        
        {user ? <h1>{user.uid}</h1> :  <div><button onClick={() => login()}>Sign Up</button> <button onClick={() => signin()}>Sign in with Google</button></div> }
    </div>
  );
}

export default App;
