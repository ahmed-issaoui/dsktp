import { Link } from "react-router-dom";
import styles from "./Parameters.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseClient";




const Parameters = () => {
  const [user, loading] = useAuthState(auth);
  

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Account</h1>
        <form className={styles.form1}>
          <h3>Account Email</h3>
          <p>{user.email}</p>
          <button>Manage Subscription </button>
          <h3>Customer Support Email</h3>
          <p> support@easyjob.atlassian.net </p>
          <h3>Customer Support Portal</h3>
          <p>https://easyjob.atlassian.net/servicedesk/customer/portal/1</p>
          <button>Visit</button>
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
