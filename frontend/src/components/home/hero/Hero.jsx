import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO LEGAL EASE' title="Simplify. Secure. Generate. It's LegalEase." />
            <p>All happy legal agreements are alike, each unhappy one is tangled in its own way.</p>
            {/* <a href="http://localhost/3000/chat">
            <div className="main-button"> Get Started NOw
             <i className='fa fa-long-arrow-alt-right'></i>
            </div> 
            </a> */}
            {/* <div className='button' id="abcd">
                <button>
                GET STARTED NOW
              </button>
              <a href = "http://localhost/3000/chat"><button>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button></a>
              
             </div> */}
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero