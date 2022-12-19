import { useNavigate } from "react-router-dom"
import styles from './WelcomePage.module.css'
import { useEffect } from "react";


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
       <img src="./assets/images/logo-easyjob.svg" alt="logo-easyjob"/>
    </div>
  )
}

export default WelcomePage