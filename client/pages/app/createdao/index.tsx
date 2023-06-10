import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import styles from '../../../styles/pages/CreateDao.module.css';
import moto from "../../../assets/Moto.svg";
import lines from "../../../assets/Lines.png"
import Image from 'next/image';
import thumbpin from "../../../assets/thumbpin.svg";
const index = () => {
  const [formData, setfirst] = useState({
    heading: "",
    memberCapacity: "",
    information: "",
  })
  const [image, setimage] =useState<File>()
  const [imageURL, setimageURL] = useState("")
  const handleClick = (e: any) => {
    console.log("Submit");

  }
  return (
    <div >
      <Navbar />
      <div className={styles.createDaoWrapper}>
        <div className={styles.daoFormContainer1}></div>
        <div className={styles.daoFormContainer2}></div>\
        {/* THE MAIN CONTAINER TO WRITE STUFF */}
        <div className={styles.daoFormContainer3}>
          <div className={styles.daoFormNavbar}>
            <div className={styles.daoFormNavbarUpper}>
              <div className={styles.upperLeft}>
                <div className={styles.upperLine}></div>
                <div className={styles.navDetails}>
                  <Image src={lines} alt="Lines" />
                  <p>CREATE YOUR DAO</p>
                </div>
              </div>
              <div className={styles.upperRight}>
                <Image src={moto} alt="With a Really Low Fee" />
              </div>
            </div>
            <div className={styles.daoFormNavbarLower}>
            </div>
          </div>
          <div className={styles.lowerLine}>
          </div>
          <form className={styles.daoForm}>
            <div className={styles.formLeft}>
              <div className={styles.imageHolderStyling}>
                <Image src={thumbpin} alt="Thumbpin" className={styles.thumbpin} />
                <div>
                  {imageURL==""?
                    <input type="file" placeholder='Choose Image'
                      value={imageURL} onChange={(e) => {
                      
                          if (!e.target.files || e.target.files.length === 0) {
                            setimage(undefined)
                            return
                        }
                        setimage(e.target.files[0])
                          console.log(e.target.files);
                          setimageURL(URL.createObjectURL(e.target.files[0]))

                      }}
                    />
                    :
                    <img src={imageURL} alt="Uploaded Image" className={styles.uploadedImage}/>
                  }
                </div>
              </div>
            </div>
            <div className={styles.formRight}>
              <input placeholder='Enter Your Heading' className={styles.heading} value={formData.heading} onChange={(e) => {
                setfirst({ ...formData, heading: e.target.value })
              }} name="Heading" />
              <div className={styles.memberCapacity}>
                Member Capacity <input value={formData.memberCapacity} onChange={(e) => {
                  setfirst({ ...formData, memberCapacity: e.target.value })
                }} />
              </div>
              <textarea placeholder='Add Information About Dao' className={styles.textArea} rows={6}
                value={formData.information} onChange={(e) => {
                  setfirst({ ...formData, information: e.target.value })
                }}
              />
              <div className={styles.daoButton} onClick={handleClick}>
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default index