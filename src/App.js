import logo from './logo.svg';
import './App.css';
import { routing } from './router';
import { LoginProvider } from './context/LoginContext';
import { useState } from 'react';

function App() {
 const [login,setlogin] = useState(false)
const logout=()=>
{
  setlogin(false)
}
const changelogin=()=>
{
  setlogin(true)
}

const loginfo={
       login:login,
       logout:logout,
       changelogin:changelogin
  }
  return (
    <div>
      <LoginProvider value={loginfo}>
        {routing}
      </LoginProvider>
    </div>
  );
}

export default App;
