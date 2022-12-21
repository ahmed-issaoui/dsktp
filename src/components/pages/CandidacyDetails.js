import { useNavigate, Link } from "react-router-dom";
import styles from "./CandidacyDetails.module.css";

const CandidacyDetails = () => {
  let navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/PotentialQuestions')
    }
  }
  
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Candidacy Details</h1>

        <form className={styles.form1}>
          <input type="text" placeholder="Name" onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="text" placeholder="Phone" onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="text" placeholder="Email" onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="file" placeholder="Add Resume" onKeyDown={(e)=>{handleEnter(e)}}/>

          <div className={styles.buttonPart}>
            <Link to='/SearchDetails'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/PotentialQuestions'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
          </div>
        </form>
      </div>

      <div class="imgPart">
        <img src="../assets/images/img-page3.png" alt="page2img" />
      </div>
    </div>
  );
};

export default CandidacyDetails;
