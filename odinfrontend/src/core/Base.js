import React from 'react'
import Menu from './Menu';

const Base = ({
    title = "Title",
    description = "Description",
    className = "bg-transparent text-white p-4", // p-4
    children,
}) => {
  return (
    <div>
        <Menu/>

        <div className="container-fluid">
            <div className="bg-dark bg-gradient text-white text-center p-3 mb-2" >
                <img className="Header-logo" src={require('../only_logo_big.png')} alt="The Odin Store Logo" width="200" height="200" align="right" float="left"/>
                <img className="Header-logo" src={require('../only_logo_big.png')} alt="The Odin Store Logo" width="200" height="200" align="left" float="left"/>
                <br />
                <h2 className="display-3">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>

        <footer className="footer bg-dark mt-auto py-3">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>If you have any questions, please contact us below:</h4>
                {/* <h6><a href="mailto: contact@theodinstore.com" className="text-white">contact@theodinstore.com</a></h6> */}
                {/* <button className="btn btn-warning btn-lg">Contact Us</button> */}

                {/* You can use this (class="button") class separately along with className, it'll work just fine.  */}
                <a href="mailto: contact@theodinstore.com" className=" button btn btn-warning btn-lg">Contact Us</a>
                <div className="container">
                    <span className="text-white">
                        &copy; {new Date().getFullYear()} The Odin Store. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Base;