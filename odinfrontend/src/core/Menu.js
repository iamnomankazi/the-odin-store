import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth/helper/'


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#2ecc72'}
    }
    else {
        return {color: '#ffffff'}
    }
}

const Menu = ({history, path}) => {
  return (
    <div>
        {/* <img className="logo" src="https://img.icons8.com/ios/2x/logo-filled.png" alt="logo" /> */}
        <ul className="navbar navbar-expand-lg navbar-dark bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/")} to="/">Home</Link>
            </li>

             
            {isAuthenticated() && (
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>
            )}

            {isAuthenticated() && (
                <li className="nav-item" style={{textAlign: "right"}}>
                    <Link className="nav-link" style={currentTab(history, "/user/cart")} to="/user/cart">Cart</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/signin")} to="/signin">Sign In</Link>
                    </li>   
                </Fragment>
            )}

           {isAuthenticated() && (
                <li className="nav-item">
                    <span 
                        onClick={() =>{
                            signout(() => {
                                history.push('/')
                            })
                        }}
                        className="nav-link text-warning"
                        style={{cursor: 'pointer'}}
                        >
                            Sign Out
                    </span>
                </li>
           )}
           
        </ul>
    </div>
  )
}

export default withRouter(Menu)