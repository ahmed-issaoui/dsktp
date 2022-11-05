import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.section}>
      <div className={styles.textPart}>

        <h1>Oops.. Something Went Wrong</h1>
        <div className={styles.buttonPart}>

          <Link to="/">
            <button form="form1" type="button" className={styles.secondaryButton}>
              Home{" "}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
