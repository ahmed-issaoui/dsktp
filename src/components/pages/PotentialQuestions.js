import { Link } from "react-router-dom";
import styles from "./PotentialQuestions.module.css";

const PotentialQuestions = () => {
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Possible Questions</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Are you allowed to work in this country?"/>
          <input type="text" placeholder="Do you need visa sponsorship?" />
          <input type="text" placeholder="How many years do you have in the skill?"/>
          <input type="text" placeholder="Are you an army veteran?" />
          <input type="text" placeholder="Where are you located right now?" />
          <input type="text" placeholder="Do you have a bachelor degree?" />
        </form>

        <div className={styles.buttonPart}>
            <Link to='/CandidacyDetails'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/LaunchCampaign'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
        </div>

      </div>
      
    </div>
  );
};

export default PotentialQuestions;
