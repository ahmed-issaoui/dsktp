import { Link } from "react-router-dom"
import styles from './WelcomePage.module.css'


const WelcomePage = () => {
  return (
    <div className={styles.section}>
       <img src="./assets/images/logo-easyjob.svg" alt="logo-easyjob"/>
       <Link to='/ChooseJobBoard'>Next</Link>
       <Link to='/Parameters'>Parameters</Link>

    </div>
  )
}

export default WelcomePage