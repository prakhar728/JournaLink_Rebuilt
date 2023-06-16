import React from 'react';
import styles from './DynamicBackground.module.css'; // Import the CSS module

const DynamicBackground = ({ imageUrl,headline } :{imageUrl:string,headline:string}) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return <div className={styles.dynamicBackground} style={divStyle}>
    {headline}
  </div>;
};

export default DynamicBackground;
