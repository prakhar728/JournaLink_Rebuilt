import React from 'react'
import styles from "../../styles/components/Landing.module.css";
import live from "../../assets/Live.svg";
import Image from 'next/image';
import Rotating from "../../assets/Rotating.png";
import Link from 'next/link';
const Landing = () => {
    return (
        <div className={styles.landingWrapper}>
            <div className={styles.upper1}>
                <Image src={live} alt=" " />
            </div>
            <div className={styles.upper2}>
                <h1>&quot;Breaking Boundaries, Forging Connections&quot;.
                </h1>
                <h2>&quot;The JournaLink Unleashes the Power of Global News!&quot;</h2>
            </div>
            <div className={styles.upper3}>
                <div className={styles.left}>
                    <p>
                    Welcome to Journal Link, where the world&apos;s stories come alive. Our platform connects journalists from every corner of the globe, empowering them to go live and deliver real-time news coverage like never before. Witness breaking news unfold as it happens, gaining a global perspective from the comfort of your screen.
                    </p>
                </div>
                <div className={styles.right}>
                    <div className={styles.rotating}>
                        <Image src={'https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif'} alt="Rotating Earth " width={300} height={400}/>
                    </div>
                </div>
            </div>
            <div className={styles.upper4}>
                <Link href="/app/explore"><button>Explore</button></Link>
            </div>
        </div>
    )
}

export default Landing