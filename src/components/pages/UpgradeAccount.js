import styles from './UpgradeAccount.module.css'
import { useEffect, useState,useContext } from "react";
import { auth } from '../../firebase/firebaseClient'
import { useNavigate } from "react-router-dom";
import LoaderSpinner from '../ui/loaderSpinner';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import { GlobalContext } from '../../context/context';

const UpgradeAccount = () => {


  const [sendEmailVerification, sending, errorSend] = useSendEmailVerification(auth)

  let navigate = useNavigate();

  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount, autopilotCampaigns, setAutopilotCampaigns, user, loading, error, isUserPremium, checkLoading} = useContext(GlobalContext)

  useEffect(() => {
    setProgressCount(0)
  }, []);



  useEffect(() => {

    if (!user && !loading) {navigate("/EnterAccount")};
    if (user && isUserPremium && !checkLoading) {
      navigate("/ChooseJobBoard") 
    }

  }, [user, loading, isUserPremium, checkLoading]);

  const handleSendAgain = async () => {
    const success = await sendEmailVerification();

    if (success) {
      alert('Verification email sent');
    }
  }
  
  const handleUpgrade = () => {
    window.api.upgradeAccount();
  }


  
  if (checkLoading) {
    return (
      <>
        <LoaderSpinner/>
      </>
    )
  };

  if (user && !user.emailVerified) {
    return (
    <>
    {!isUserPremium && !checkLoading &&
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
    {user && user.emailVerified && !checkLoading && !isUserPremium &&
      <div className={styles.section}>
            <h1>You need to upgrade your account</h1>
            <button className={styles.primaryButton} onClick={handleUpgrade}>Go to Website</button>
      </div>
    }
    </>
  )
}

export default UpgradeAccount