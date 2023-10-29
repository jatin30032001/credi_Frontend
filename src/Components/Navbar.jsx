import React from "react";
import  styles  from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav_main}>
        <div className={styles.nav_main_img}>
          <img src="https://smehealthcheck.credilinq.ai/static/images/logo.svg" className={styles.navimg} alt="img"></img>
        </div>
        <div className={styles.nav_main_text}>SME HealthCheck - Get Started</div>
      </div>
    </div>
  );
};

export default Navbar;
