import React, { useState, useEffect } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


//firebase authentication
firebase.initializeApp({
  apiKey: "AIzaSyCglR_R5pKykE8JsINCsBqJmf7aRsOuORc",
  authDomain: "fir-auth-react-532c8.firebaseapp.com"
})

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [allEntry, setAllEntry] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = {email: email, password: password}
    setAllEntry([newEntry])
    console.log(allEntry)
    setIsSignedIn(true)
    setEmail('')
    setPassword('')
  }
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      console.log("user", user)
    });
    return () => unregisterAuthObserver(); 
  }, []);
  // if user is not signed in
  if (!isSignedIn) {
    return (
      <div className="main">
      <img src="/logo.png" alt= "logo svg" className="logo" width="50px" height="50px"/>
      <p className="logo_name">Sweet</p> 
        <div className="main1">
          <div className="img_section">
            <img src="/images.png" alt= "login svg"/>
          </div>
          <div className="login_buttons">
            <form action="" onSubmit={handleSubmit}>
              <input type="email" name="email" autoComplete="off" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br/>
              <input type="password" name="password" autoComplete="off" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
              <br/>
              <button type="submit">continue</button>
            </form>
            <h6>or Connect with Social Media</h6>
            <StyledFirebaseAuth className="social_buttons" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>
      </div>
    );
  }
  //if user is signed in
  return (
    <div className="sub_main">
      {allEntry.length ? (
      <>
      <div className="card">
        <div className="card_pattern">
          <img src="/pattern.jpg" alt="pattern svg" width="300px" height="100px"/>
        </div>
        <h4>user details goes here...</h4>
        <h6>No server setup for this application</h6>
      </div>
      <button className="signout" onClick={() => {
        setIsSignedIn(false)
        setAllEntry([])
      }}>Sign out</button>
      </>
      ) : (
        <>
          <div className="card">
            <div className="card_pattern">
              <img src="/pattern.jpg" alt="pattern svg" width="300px" height="100px"/>
            </div>
            <img className="pro_pic"
              alt="display profile"
              src={firebase.auth().currentUser.photoURL}
            />
            <h4>{firebase.auth().currentUser.displayName}</h4>
            <h6>Email : {firebase.auth().currentUser.email}</h6>
            <h6>LastSignIn : {firebase.auth().currentUser.metadata.lastSignInTime.substring(0,16)}</h6>
          </div>
          <button className="signout" onClick={() => firebase.auth().signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default App;