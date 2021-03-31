import React, { useState, useEffect } from 'react';
import { fb, provider } from '../../../Firebase';

export default function Login() {
  const [user, setUser] = useState();

  const handleGoogleLogin = async () => {
    // Using a redirect.
    await fb.auth().signInWithRedirect(provider);
  }

  useEffect(()=>{
    // handleGetUserSubmit();
    fb.auth().onAuthStateChanged(function(user) {
      if(user){
        console.log('>>>> User signed: user:', user);
        const { displayName, email, photoURL, providerId, uid } = user.providerData[0];
        const data = {
          user_id: uid,
          fullname: displayName,
          avatar: photoURL,
          email: email,
          provider: providerId
        }
        setUser(data);
      } else {
        console.log('No user signed');
      }
    })
  }, []);

  const handleCloseSession = async () => {
    // Using a redirect.
    await fb.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Close session');
      setUser(null);
    }).catch((error) => {
      // An error happened.
      console.log('Close error:', error);
    });
  }

  return (
    <div className="container">
      <div>
        {user ? (
          <div>
            <div>
            {user.fullname}
            </div>
            <div>
            {user.email}
            </div>
            <div>
              <img src={user.avatar} alt=""/>
            </div>
          </div>
        ) : (
          <div>
            No logged
          </div>
        )}
      </div>
      <div>
        <h1>Login</h1>
        <button onClick={() => handleGoogleLogin()}>Google Login</button>
      </div>
      <div>
        <button onClick={() => handleCloseSession()}>Close session</button>
      </div>
    </div>
  );
}