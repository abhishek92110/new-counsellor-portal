import React from 'react'
import Loading from './img/loader.gif'

const Loader = () => {
  return (
    <>  
    <div className='overlay'></div>  
    <div className='loader-section'>
        <img src={Loading}/>
    </div>
    </>

  )
}

export default Loader