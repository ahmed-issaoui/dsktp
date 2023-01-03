import styles from './UpgradeAccount.module.css'
import { useEffect, useState,useContext } from "react";
import { auth } from '../../firebase/firebaseClient'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import LoaderSpinner from '../ui/loaderSpinner';
import { CampaignContext } from "../../App";

const UpgradeAccount = () => {

  const [user, loading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)
  const [premiumLoading, setPremiumLoading] = useState(true)

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


  
  const handleUpgrade = () => {
    window.api.upgradeAccount();
  }

  if (isUserPremium) {
    navigate("/EnterAccount") 
  }
  if (premiumLoading) {
    return (
      <>
        <LoaderSpinner/>
      </>
    )
  };
  return (
    <>
    {!isUserPremium && !premiumLoading &&
      <div className={styles.section}>
            <h1>You need to upgrade your account</h1>
            <button className={styles.primaryButton} onClick={handleUpgrade}>Go to Website</button>
      </div>
    }
    </>
  )
}

export default UpgradeAccount