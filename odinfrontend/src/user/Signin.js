import React, {useState} from 'react'
import Base from '../core/Base'
import {Link, Redirect} from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper'


const Signin = () =>{

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false,
        didRedirect: false
    })

    const {name, email, password, error, success, loading, didRedirect} = values
 
    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    // form data based onsumbit functionality
    const onSubmit = (event) => {
        event.preventDefault()  //prevent default form submission
        setValues({...values, error: false, loading: true});

        signin({email, password})
        .then(data => {
            console.log("DATA", data);
            if(data.token){
                // let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("Authenticated");
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                });
            }
            else{
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                })
            }
        })
        .catch(err => console.log(err));
    };

    const performRedirect = () => {
        if(isAuthenticated()){
            return <Redirect to="/" /> //Homepage  // You can redirect to dashboard also <Redirect to="/user/dashboard" />
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    // success message
    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
                        Sign In successfully.
                    </div>
                </div>
            </div>
        )
    }

    // error message
    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                        {error}
                        Something went wrong, try again.
                    </div>
                </div>
            </div>
        )
    }
    
    // sign-in form
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input  
                            className="form-control" 
                            value={email}
                            onChange={handleChange('email')} 
                            type="text" 
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            onChange={handleChange('password')} 
                            className="form-control" 
                            value={password} 
                            type="password" 
                            />
                        </div>
                        <button onClick={ onSubmit } className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


  return (
    <Base title="Sign In" description="The Odin Store">
        {loadingMessage()}
        {signInForm()}

        <Link to="/signup" className="btn btn-outline-warning">Create Account</Link>
        
        {/* Uncomment this if you want to see the info */}
        {/* <p className="text-white text-center">
            
            {JSON.stringify(values)}
        </p> */}

        {performRedirect()}
    </Base>
  )
}

export default Signin