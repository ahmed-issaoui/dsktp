import { Link } from "react-router-dom";
import styles from "./Parameters.module.css";

const Parameters = () => {
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Parameters</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Card: XXXX XXXX XXXX 4013"/>
          <input type="text" placeholder="Account Email: johnwick@gmail.com" />
          <input type="text" placeholder="Notification: Standard"/>
          <input type="text" placeholder="Customer Support: support@easyjob.tech" />
        </form>

        <div className={styles.buttonPart}>
            <Link to='/'>
              <button form="form1" type="button" className={styles.secondaryButton}>Home</button>
            </Link>
        </div>

      </div>
      
    </div>
  );
};

export default Parameters;
