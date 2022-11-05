import styles from "./ChooseJobBoard.module.css";
import { Link } from "react-router-dom"

const ChooseJobBoard = () => {
  return (
    <div className={styles.section}>
        <h1>Select a Campaign</h1>
        <div className={styles.channels}>
          <img
            src="../assets/images/img-glassdoor.png"
            alt="glassdoor"
            className={styles.glassdoor}
          />
          <img
            src="../assets/images/img-linkedin.png"
            alt="linkedin"
            className={styles.linkedin}

          />
          <img
            src="../assets/images/img-indeed.png"
            alt="indeed"
            className={styles.indeed}
          />
        </div>
        <Link to='/SearchDetails'>Next</Link>
    </div>
  );
};

export default ChooseJobBoard;
