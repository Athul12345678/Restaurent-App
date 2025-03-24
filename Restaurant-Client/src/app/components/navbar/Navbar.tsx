'use client'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { TiThMenuOutline } from "react-icons/ti";
import { IoMdCloseCircleOutline } from "react-icons/io";


function Navbar() {
  const[showbar,setShowbar]=useState(Boolean)
  return (
    <div className={styles.navbar}>
      <div>

      </div>
    
        <ul className={styles.navList}>
         <li className={styles.navItem}>HOME</li>
         <li className={styles.navItem}>MENU</li>
         <li className={styles.navItem}>MAKE A RESERVATION</li>
         <li className={styles.navItem}>CONTACT US</li>
        </ul>

        {!showbar && <TiThMenuOutline  className={styles.menuIcon} onClick={()=>setShowbar(true)}/>}
      { showbar &&<ul className={styles.mobNavList}>
        <li><IoMdCloseCircleOutline className={styles.closeIcon} onClick={()=>setShowbar(false)}/></li>
        <li className={styles.mobNavItem}>HOME</li>
         <li className={styles.mobNavItem}>MENU</li>
         <li className={styles.mobNavItem}>MAKE A RESERVATION</li>
         <li className={styles.mobNavItem}>CONTACT US</li>
        </ul>}
    </div>
  )
}

export default Navbar
