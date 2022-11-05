import { Link } from "react-router-dom";
import styles from "./CandidacyDetails.module.css";

const CandidacyDetails = () => {
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Candidacy Details</h1>

        <form className={styles.form1}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone" />
          <input type="text" placeholder="Email" />
          <input type="file" placeholder="Add Resume" />

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
