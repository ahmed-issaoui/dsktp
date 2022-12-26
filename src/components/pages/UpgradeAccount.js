import styles from './UpgradeAccount.module.css'
import { useEffect, useState } from "react";
import { auth } from '../../firebase/firebaseClient'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import LoaderSpinner from '../ui/loaderSpinner';


const UpgradeAccount = () => {

  const [user, loading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)
  const [premiumLoading, setPremiumLoading] = useState(true)

  let navigate = useNavigate();


  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user && !loading) {navigate("/EnterAccount")};

    const premiumLoader = setTimeout(() => {
      setPremiumLoading(false)
    }, 1000);

    return () => clearTimeout(premiumLoader);

  }, [user, loading, navigate]);


  
  const handleUpgrade = () => {
    window.api.upgradeAccount();
  }


  return (
    <>
    {premiumLoading && <LoaderSpinner/>}

    {isUserPremium && navigate("/EnterAccount")}

    {!isUserPremium && !premiumLoading &&
      <div className={styles.section}>
            <h1>You need to upgrade your account</h1>
            <div><p onClick={handleUpgrade}>Forgot Password</p></div>
      </div>
    }
    </>
  )
}

export default UpgradeAccount