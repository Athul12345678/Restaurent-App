import React from 'react'
import styles from './footer.module.css'

function Footer() {
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.head}>CONNECT WITH US</h2>
        <div className='phoneContainer'> <img src="/assets/bytesize_telephone.png" alt="" /><span className={styles.text}>+91 9567843340</span></div>
        <div className='mailContainer'><img src="/assets/formkit_email.png" alt="" /> <span className={styles.text}>info@deepnetsoft.com</span></div>
      </div>
      <div className={styles.box}>
        <div style={{display:"flex"}}>
        <span className={styles.content} style={{  color: "#0796EF"}}>DEEP </span> <span className={styles.content} style={{ color:" #FFFFFF"}}>NET </span><span className={styles.content} style={{color: "#857878"}}>SOFT</span>
        </div>
      </div>
      <div className={styles.box}>
        <h2  className={styles.head}>FIND US</h2>
        <div style={{display:"flex"}}>
        <img src="/assets/streamline_travel-map-location-pin-navigation-map-maps-pin-gps-location.png" alt="" /><span className={styles.text}>First floor, Geo infopark, Infopark EXPY, Kakkanad</span>
        </div>
      </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.itemOne}>
        <p className={styles.footerContent}>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
        </div>
        <div className={styles.itemTwo}>
            <span className={styles.footerContent}>Terms & Conditions     </span>
            <span className={styles.footerContent}>Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
