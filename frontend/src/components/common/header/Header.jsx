import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import {LogContext} from './../../../context/LogContext'
import {useNavigate} from "react-router-dom"


const Header = () => {
  const {userEmail,setUserEmail} = useContext(LogContext);
  const navigate = useNavigate();
  const [click, setClick] = useState(false)

  const handleLogOut = () => {
    setUserEmail('');
    navigate('/login');
  }

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {/* <li>
              <Link to='/courses'>All Courses</Link>
            </li> */}
            {/* <li>
              <Link to='/about'>About</Link>
            </li> */}
            <li>
              <Link to='/team'>Team</Link>
            </li>
            <li>
              <Link to='/pricing'>Pricing</Link>
            </li>
            {/* <li>
              <Link to='/journal'>Journal</Link>
            </li> */}
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/chat'>Generate</Link>
            </li>
            <li>
              <Link to='http://localhost:5173'>Create NFT</Link>
            </li>
            {/* <li>
              <Link to='/contact'>Contact</Link>
            </li> */}
          </ul>
          {/* <div className='start'>
            <div className='button'>GET CERTIFICATE</div>
          </div> */}
          {userEmail && (<button className='logoutbutton' onClick={handleLogOut}>Logout
            {/* {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>} */}
          </button>)}
        </nav>
      </header>
    </>
  )
}

export default Header