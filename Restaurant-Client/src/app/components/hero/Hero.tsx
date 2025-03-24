import React from 'react'
import styles from './hero.module.css'

function Hero() {
  return (
    <div className={styles.container}> 
 <div className={styles.titleContainer}> 
    <h1 className={styles.title}>MENU</h1>
    </div>
    <div className={styles.descriptionContainer}>
   <p className={styles.description}>
   Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
   </p>
   </div>
    </div>
  )
}

export default Hero
