import React, { useEffect, useState } from 'react';
import './App.css';
import { auth } from './components/firebases';
import Login from './components/login/login';
import Home from './components/home/home';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [])
  return (
    <div className="App">
      {user ? <Home user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
