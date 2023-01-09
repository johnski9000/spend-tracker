import React from 'react'
import styles from "./Header.module.css"
import logo from "../images/size-logo.png"

function Header() {
 
  

  return (
<div id={styles.header_container}>
    <img id={styles.mainLogo} alt="Vue logo" src={logo} />
    <div className={styles.navLinks}>
      
      <a href="/" >Home</a>
      <a href="/spend-form">Spend Form</a>
      <a href="/contribution-form">Contribution Form</a>
      <a href="/spend-detail">Spend Detail</a>
      {/* <router-link to="/">Home</router-link>
      <router-link to="/FrontEndView">Spend Form</router-link>
      <router-link to="/ContributionView">Contribution Form</router-link>
      <router-link to="/BackEndView">Spend Detail</router-link> */}
    </div>
  </div>  )
}

export default Header