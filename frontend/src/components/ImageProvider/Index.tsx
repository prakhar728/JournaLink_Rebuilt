import React from 'react';
import  './DynamicBackground.css'; // Import the CSS module

const DynamicBackground = ({ imageUrl,headline,newsid } :{imageUrl:string,headline:string,newsid:string}) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return <div className={"dynamicBackground"} style={divStyle} onClick={e=>{
  }}>
    {headline}
  </div>;
};

export default DynamicBackground;
