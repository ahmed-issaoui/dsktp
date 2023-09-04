import { useNavigate } from "react-router-dom"
import styles from './WelcomePage.module.css'
import { useEffect, useState } from "react";


const WelcomePage = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
    const goNext = setTimeout(() => {
      navigate("/EnterAccount")
    }, 1500);

    return () => clearTimeout(goNext);
  }, [navigate]);

  return (
    <div className={styles.section}>
       <img src="./assets/images/logo-superlazy.svg" alt="logo-superlazy"/>
    </div>
  )
}

export default WelcomePage