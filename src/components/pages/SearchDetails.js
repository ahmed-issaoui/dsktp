import { Link } from 'react-router-dom'
import styles from './SearchDetails.module.css'


const SearchDetails = () => {
  return (
    <div className={styles.section}>

      <div className={styles.imgPart}>
        <img src="./assets/images/img-page2.png" alt="page2img" />
      </div>

      <div className={styles.textPart}>
        <h1>Search Details</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Job Title" />
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Remote" />
          <div className={styles.buttonPart} >
            <Link to='/ChooseJobBoard'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/CandidacyDetails'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
           </div>
        </form>
      </div>


    </div>
  )
}

export default SearchDetails