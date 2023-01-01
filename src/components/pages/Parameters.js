import { Link } from "react-router-dom";
import styles from "./Parameters.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseClient";

import { useEffect, useContext} from "react";
import { CampaignContext } from "../../App";


const Parameters = () => {
  const [user, loading] = useAuthState(auth);
  
  const {setProgressCount} = useContext(CampaignContext)
  useEffect(() => {
    setProgressCount(0)
  }, []);

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Account</h1>
        <div className={styles.elementsContainer}>

            <div className={styles.element}>
              <h3>Account Email</h3>
              <div className={styles.elementData}> 
                <p>{user.email}</p>
              </div>
            </div>

            <div className={styles.element}>
              <h3>Subscription</h3>
              <div className={styles.elementDataLink}> 
                <p>Manage on Customer Portal</p>
              </div>
            </div>

            <div className={styles.element}>
              <h3>Support Email</h3>
              <div className={styles.elementData}>
                <p>support@easyjob.atlassian.net</p>
              </div>
            </div>

            <div className={styles.element}>
              <h3>Support Portal</h3>
              <div className={styles.elementDataLink}>
                <p>https://easyjob.atlassian.net/servicedesk/customer/portal/1</p>
              </div>
            </div>

        </div>

        <Link to='/ChooseJobBoard'>
          <button form="form1" type="button" className={styles.primaryButton}>Back</button>
        </Link>

      </div>
      
    </div>
  );
};

export default Parameters;
