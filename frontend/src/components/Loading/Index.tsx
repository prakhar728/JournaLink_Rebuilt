import React from 'react'
import  "./Loading.css";
import loading from "../../assets/loading.gif";
const Index = ({ message }:{message:String}) => {
  console.log(message);
  
  return (
    <div className={"loadingWrapper"}>
      <div className={"loadingmainContent"}>
        <div className={"loadingimageWrapper"}>
          <img src={loading} alt="Loading Content" />
        </div>
        <div className={"loadingmessageWrapper"}>
          <p>
            {message}
          </p>
        </div>
      </div>

    </div>
  )
}

export default Index