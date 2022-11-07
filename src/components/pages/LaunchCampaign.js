import { Link } from "react-router-dom";
import styles from "./LaunchCampaign.module.css";


const NotFound = () => {
  async function pptrrr() {window.api.pptr()};

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Launch Campaign?</h1>

        <div className={styles.buttonPart}>
            <Link to='/PotentialQuestions'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/'>
              <button 
                form="form1" 
                type="button" 
                className={styles.primaryButton}
                onClick={pptrrr}
                >Confirm</button>
            </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFound;