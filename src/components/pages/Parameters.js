import { Link } from "react-router-dom";
import styles from "./Parameters.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseClient";

import { useEffect, useContext} from "react";
import { GlobalContext } from "../../context/context";
import { app } from "../../firebase/firebaseClient";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";

const Parameters = () => {
  const [user, loading] = useAuthState(auth);
  
  const {setProgressCount} = useContext(GlobalContext)
  const [appVersion, setAppVersion] = useState("")


  useEffect(() => {
    setProgressCount(0)
  }, []);

  

  useEffect(()=> {
    const getAppVersion = async () => {

      const version = await window.api.appVersion()
      setAppVersion(version)
    }
    getAppVersion()
  },[])

  const handleSupport = () => {
    window.api.support();
  }
  
  const sendToCustomerPortal = () => {
    if (user) {
    
    const functions = getFunctions(app,'europe-west1');
    const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink',);
  
    functionRef({returnUrl: 'https://superlazy.io'})
    .then((result) => {
      const data = result.data
      window.api.customerPortal(data.url);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  }

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
              <h3>Version</h3>
              <div className={styles.elementData}> 
                <p>{appVersion}</p>
              </div>
            </div>

            <div className={styles.element}>
              <h3>Subscription</h3>
              <div className={styles.elementDataLink} onClick={sendToCustomerPortal}> 
                <p>Manage on Customer Portal</p>
              </div>
            </div>

            <div className={styles.element} >
              <h3>Support Email</h3>
              <div className={styles.elementData}>
                <p>support@superlazyapp.atlassian.net</p>
              </div>
            </div>

            <div className={styles.element}>
              <h3>Support Portal</h3>
              <div className={styles.elementDataLink} onClick={handleSupport}>
                <p>https://superlazyapp.atlassian.net/servicedesk/customer/portal/1</p>
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
