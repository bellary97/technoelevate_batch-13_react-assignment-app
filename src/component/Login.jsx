import React from 'react'
import { useHistory } from 'react-router-dom'
import LoginContext from '../context/LoginContext'
import { useContext } from 'react'


export default function Login() {
    const context = useContext(LoginContext)
    const history = useHistory()
    const login=()=>
    {
       context.changelogin(true)
       history.push("/")
    }
    return (
        <div className="container col-md-6">
            <h3>Login Here</h3>
            <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
</form>      
 </div>
    )
}
