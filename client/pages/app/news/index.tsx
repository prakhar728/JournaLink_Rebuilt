import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from "./NewsDashboard.module.css";
import Link from 'next/link';
import Image from 'next/image';
import upi from "../../../assets/upi.jpg";
import chess from "../../../assets/Chess.jpg";
import DynamicBackground from '../../../components/ImageProvider/Index';
const index = () => {
    const url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ667HUYxX5wvnvT3E4uWyTVAiCdfFw0aZJ7ayGQGFI&s";
    const headline = "Carlsen believes India is on track to become a leading chess nation";
    return (
        <div>
            <Navbar />
            <h1 className={styles.heading}>Journalism Dashboard</h1>
            <div className={styles.outerWrapper}>
                <div className={styles.d1}>
                    <div className={styles.journalismNav}>
                        <Link href="/app/news">Explore Journalism</Link>
                        <Link href="/app/createnews">Create News</Link>
                        <Link href="/">View Your News</Link>
                    </div>
                    <div className={styles.trendingList}>
                        <h2>Trending News</h2>
                        <div className={styles.trendingNewsWrapper}>
                            <div className={styles.imageContainer}>

                            <Image src={upi} alt="Upi now in India"  width={300} height={300}/>
                            </div>
                            <div className={styles.info}>
                                <span>By Gulveen Aulakh</span>
                                <span>2 Hours Ago</span>
                            </div>
                            <p>
                            India looks to take UPI to Saudi, Bahrain, other Gulf countries
                            </p>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.divideLine}>

                </div>
                <div className={styles.d2}>
                    <div className={styles.left}>
                        <DynamicBackground imageUrl={url} headline={headline} />
                    </div>

                    <div className={styles.right}>
                        
                    </div>
                </div>
                <div className={styles.divideLine}>

                </div>
                <div className={styles.d3}>
                    <div className={styles.textNews}>
                        <p className={styles.headingNews}>India's Health Minsitry denies Covid Data Breach</p>
                        <div>
                            <span>By Gulveen Aulakh</span>
                            <span>2 Hours ago</span>
                        </div>
                    </div>
                    <div className={styles.lowerLine}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default index