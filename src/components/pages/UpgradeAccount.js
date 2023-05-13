import styles from './UpgradeAccount.module.css'
import { useEffect, useState,useContext } from "react";
import { auth } from '../../firebase/firebaseClient'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import LoaderSpinner from '../ui/loaderSpinner';
import { CampaignContext } from "../../App";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';

const UpgradeAccount = () => {

  const [user, loading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)
  const [premiumLoading, setPremiumLoading] = useState(true)

  const [sendEmailVerification, sending, errorSend] = useSendEmailVerification(auth)

  let navigate = useNavigate();

  const {setProgressCount} = useContext(CampaignContext)

  useEffect(() => {
    setProgressCount(0)
  }, []);



  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user && !loading) {navigate("/EnterAccount")};

    const manageLoader = setTimeout(() => {
      setPremiumLoading(false)
    }, 3000);

    return () => clearTimeout(manageLoader);

  }, [user, loading]);

  const handleSendAgain = async () => {
    const success = await sendEmailVerification();

    if (success) {
      alert('Verification email sent');
    }
  }
  
  const handleUpgrade = () => {
    window.api.upgradeAccount();
  }

  if (isUserPremium) {
    navigate("/Dashboard") 
  }
  
  if (premiumLoading) {
    return (
      <>
        <LoaderSpinner/>
      </>
    )
  };

  if (user && !user.emailVerified) {
    return (
    <>
    {!isUserPremium && !premiumLoading &&
      <div className={styles.section}>
            <div className={styles.textPart}>
                  <div className={styles.titlePart}>
                    <h2> Verify your Email </h2>
                  </div>
                  <p>Verification email to {user.email}, please check it</p>



                  <div className={styles.buttonPart}>
                    <button className={styles.primaryButton} form="form1" type="button" onClick={handleSendAgain}>Verify Account</button>  
                  </div>
                    
            </div>
      </div>
    }
    </>
    )
  }
  return (
    <>
    {user && user.emailVerified &&!isUserPremium && !premiumLoading &&
      <div className={styles.section}>
            <h1>You need to upgrade your account</h1>
            <button className={styles.primaryButton} onClick={handleUpgrade}>Go to Website</button>
      </div>
    }
    </>
  )
}

export default UpgradeAccount