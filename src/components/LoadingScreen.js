import React, { Fragment } from 'react'
import ReactLoading from "react-loading"
function LoadingScreen() {
  return (
    <div style={{backgroundColor: 'red', width: '100%', height: '100%'}}>
        <div style={{position: 'fixed', top: "40%", left: '45%', zIndex: 10}}>
            <ReactLoading
            type='spinningBubbles'
            color={"#03fc4e"}
            height={100}
            width={100}
            
            />
        </div>
        
    </div>
  )
}

export default LoadingScreen