
import React, { Component } from 'react'
import axios from 'axios'
export default class Register extends Component {
    state={
        user:"",
        email:"",
        pwd:"",
        phn:"",
        role:""
    }

    handleChange=(e)=>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
    handleSubmit=(e)=>
    {
        const acc={...this.state}
        e.preventDefault()
        console.log(this.state);
        const url='https://ems-react-d2ccb-default-rtdb.firebaseio.com/accounts.json'
        axios.post (url,acc).then((resp)=>
        {
          if(resp.status===200)
          {
            this.props.history.push("/show")
            this.setState(
              {
                user:"",
                email:"",
                pwd:"",
                phn:"",
                role:""
            }
            )
          }
        }).catch((err)=>
        {
          console.log(err);
        })
    }
    render() {
        return (
            
                <div className="container col-md-6" onSubmit={this.handleSubmit} >
                <h1>Register page</h1>
                <form>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">User name</label>
                  <input type="text" className="form-control" id="name"
                   name="user" value={this.state.user} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  name="email" value={this.state.email} onChange={this.handleChange}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" 
                  name="pwd" value={this.state.pwd} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Phone no</label>
                  <input type="number" className="form-control" id="phn"
                  name="phn" value={this.state.phn} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Designation</label>
                  <input type="text" className="form-control" id="role"
                  name="role" value={this.state.role} onChange={this.handleChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
               </form>
               </div>
                  
        )
    }
}
