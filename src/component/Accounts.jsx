
import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export default class Accounts extends Component {
    state={
        accounts:[],
        show:false,
        user:"",
        email:"",
        pwd:"",
        phn:"",
        role:""
    }
  componentDidMount()
  {
      console.log("");
      axios.get('https://ems-react-d2ccb-default-rtdb.firebaseio.com/accounts.json').then((resp)=>
      {
         let fetchedAccount=[]
         for (const key in resp.data) {
             fetchedAccount.push({
                 id:key,
              ...resp.data[key]
             })
         }
         console.log(fetchedAccount);
         this.setState({
             accounts:fetchedAccount
         })
      }).catch((err)=>
      {
          console.log(err);
      })
  }
  
  handleDelete=(account) =>
  {
     axios.delete(`https://ems-react-d2ccb-default-rtdb.firebaseio.com/accounts/${account.id}.json`).then((resp)=>
     {
         console.log("deleted");
         const updatedAccount=this.state.accounts.filter((acc)=>
         {
             return acc.id !== account.id ? acc:null
         })
         this.setState(
             {
                 accounts:updatedAccount
             }
         )

     }).catch((err)=>
     {
         console.log(err);
     })
  }

  handleClose=()=>
  {
      this.setState({show:false})
  }

  handleChange=(e)=>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    updateRecord=(acc)=>
    {
        const {user,email,role,phn,pwd,id}=acc;
        this.setState({
            show:true,
            user:user,
            email:email,
            pwd:pwd,
            phn:phn,
            role:role,
            id:id
        })
    }

    updatedAccount=()=>{
        const url=`https://ems-react-d2ccb-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`
        const {user,email,role,phn,pwd,id}=this.state
        const account={
            user,
            email,
            pwd,
            phn,
            role
        };

        axios.put(url,account).then((resp)=>
        {
          const updated = this.state.accounts.map((acc)=>
            {
                return acc.id !== this.state.id ? acc:account
            })
            console.log(resp.status);
            this.setState({
                accounts:updated,
                show:false,
                user:"",
                email:"",
                pwd:"",
                phn:"",
                role:""
            })
        }).catch((err)=>
        {
            console.log(err);
        })

    }
  

    render() {
        return (
            <div>
                 <h1>Account page</h1>
  <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Sl no</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone no</th>
      <th scope="col">Designation</th>
    </tr>
  </thead>
  <tbody>
      {
      this.state.accounts.map((data,index)=>
      {
            return (
                <tr>
                   <td>{index+1}</td>
                   <td>{data.user}</td>
                   <td>{data.email}</td>
                   <td>{data.phn}</td>
                   <td>{data.role}</td>
                   <Button className="btn btn-seconary" onClick={()=>
                   {
                    this.handleDelete(data)
                   }} >Delete</Button>
                   <Button className="btn btn-success" onClick={()=>{
                      this.updateRecord(data)
                   }} >Update</Button>
                </tr>
            )
      })
    }
  </tbody>
</table>


  <Modal
   show={this.state.show}
   animation={false}
   onhide={this.handleClose}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
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
              
               </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose} >Close</button>
        <button type="button" className="btn btn-primary" onClick={this.updatedAccount}>Save changes</button>
      </div>
    </div>
  </Modal>
</div>
   
           
        )
    }
}
