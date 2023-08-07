import React from 'react'
import loading from "./loading.gif"

const Spinner=(props)=>{
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading"/>
      </div>
    )

}

export default Spinner
