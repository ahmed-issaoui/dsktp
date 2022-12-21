import { useNavigate, Link } from "react-router-dom";
import styles from './SearchDetails.module.css'


const SearchDetails = () => {
  let navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/CandidacyDetails')
    }
  }

  return (
    <div className={styles.section}>

      <div className={styles.imgPart}>
        <img src="./assets/images/img-page2.png" alt="page2img" />
      </div>

      <div className={styles.textPart}>
        <h1>Search Details</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Job Title"  onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="text" placeholder="Location"  onKeyDown={(e)=>{handleEnter(e)}} />
          <input type="text" placeholder="Remote" onKeyDown={(e)=>{handleEnter(e)}} />
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