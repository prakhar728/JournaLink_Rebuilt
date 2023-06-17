import React from 'react';
import styles from './DynamicBackground.module.css'; // Import the CSS module
import { useRouter } from 'next/router';

const DynamicBackground = ({ imageUrl,headline,newsid } :{imageUrl:string,headline:string,newsid:string}) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  const router = useRouter();

  return <div className={styles.dynamicBackground} style={divStyle} onClick={e=>{
  router.push(`/app/news/${newsid.toString()}`)
  }}>
    {headline}
  </div>;
};

export default DynamicBackground;
