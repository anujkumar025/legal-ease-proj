import "./App.css"
// import Header from "./components/common/header/Header"
import React, {useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
// import Footer from "./components/common/footer/Footer"
// import Home from "./components/home/Home"
import {LogContext} from './context/LogContext'
import Login from './components/login/Login'

function App() {
  const [userEmail, setUserEmail] = useState("koto");
  return (
    <>
      <Router>
      <div>
        <LogContext.Provider value={{userEmail, setUserEmail}}>
          {/* <Header /> */}
          <Routes>
            <Route exact path='/' element={[<Login/>]} />
            <Route exact path='/about' element={[<About/>]} />
            <Route exact path='/home' element={[<CourseHome/>]} />
            <Route exact path='/team' element={Team} />
            <Route exact path='/pricing' element={Pricing} />
            <Route exact path='/journal' element={Blog} />
            <Route exact path='/contact' element={Contact} />
          </Routes>
          {/* <Footer /> */}
        </LogContext.Provider>
      </div>
      </Router>
    </>
  )
}

export default App