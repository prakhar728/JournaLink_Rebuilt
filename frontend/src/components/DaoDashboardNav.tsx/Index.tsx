import React, { useState } from 'react'
import  './DaoNav.css';
import { Link } from 'react-router-dom';
const Index = () => {
  const [activeElement, setactiveElement] = useState("1");
  const handleClick = (e:any) =>{
    console.log('Clicked');
  }
  return (
    <div className={"daoNav"}>
      <Link to="/app/explore"  className={`${"daonavLink"} ${activeElement=== '1' ? "active" : ''
          }`} onClick={(e)=>{
        setactiveElement("1");
      }}>Explore DAOs</Link>
      <Link  to="/app/createdao" className={`${"daonavLink"} ${activeElement=== '2' ? "active" : ''
          }`} onClick={(e)=>{
        setactiveElement("2");
      }}>Create DAO +</Link>
    </div>
  )
}

export default Index