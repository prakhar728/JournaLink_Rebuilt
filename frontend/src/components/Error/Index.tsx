import React from 'react'
import  "./Error.css"
import error from "../../assets/error.gif";
const Index = ({message, setErrorStatus}:{message:string,setErrorStatus:any}) => {
  return (
    <div className={"errorMessage"}>
      <div className={"errormainContent"}>
      <div className={"closeButton"}>
        <button onClick={e=>{
          setErrorStatus(false);
        }}>x</button>
      </div>
        <div className={"errorimageWrapper"}>
          <img src={error} alt="Error Here" />
        </div>
        <div className={"errormessageWrapper"}>
          <p>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index