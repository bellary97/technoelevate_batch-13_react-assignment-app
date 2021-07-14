import { Link, BrowserRouter as Router, Route , Switch } from "react-router-dom"
import Home from "./component/Home"
import Register from "./component/Register"
import Account from "./component/Accounts"
import Login from "./component/Login"
import { LoginConsumer } from "./context/LoginContext"

export const routing=(
  <Router>
  <nav className="navbar navbar-expand-lg text-light navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">School Portal</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
  <LoginConsumer>
    {
      (loginfo)=>
      {
        if(loginfo.login)
        {
          return <>
                  <li className="nav-item active">
                  <Link className="nav-link" to="/create">Register<span className="sr-only">(current)</span></Link>
                 </li>
                 <li className="nav-item">
                 <Link className="nav-link" to="/show">Students Data</Link>
                 </li>
                 <li className="nav-item">
                 <p className="nav-link" onClick={loginfo.logout}>Logout
                 </p>
                 </li>
                </>
        }
        else
        {
         return ( <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
          </li>
         )
        }
      }
    }
  </LoginConsumer>

    </ul>
    
  </div>
</nav>
<switch>
<Route path="/" exact component={Home} />
<Route path="/create" exact component={Register} />
<Route path="/show" exact component={Account} />
<Route path="/login" exact component={Login} />
</switch>
</Router>
)