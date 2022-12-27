import styles from './navBar.module.css';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, logout} from "../../firebase/firebaseClient"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import ProgressPart from './ProgressPart';


function NavBar() {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)

  useEffect(() => {
    if (loading) {
      return;
    } 

    if (!user && !loading) {navigate('/EnterAccount')}
    if (user && !isUserPremium) {navigate('/UpgradeAccount')}

  }, [user, loading, isUserPremium, navigate]);


  const handleRegister = () => {
    window.api.registerAccount();
  }

  const handleForgotPassword = () => {
    window.api.forgot();
  }
  const handleSupport = () => {
    window.api.support();
  }


  return (
    <>
    { !user && 
      <div className={styles.navContainer}>
          <div className={styles.navIcons}> 
            <img src="../assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon} />
            <img src="../assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>
          </div>

          <div className={styles.linksContainer}>
            <button className={styles.accountLink} onClick={handleSupport}>Contact support</button>
            <button className={styles.accountLink} onClick={handleRegister}>Create an account</button>
            <button className={styles.accountLink} onClick={handleForgotPassword}>Forgot password</button>
          </div>
      </div>
    }
    { user && 
      <div className={styles.navContainer}>
        
          <div className={styles.navIcons}> 
            <img src="../assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon} onClick={()=> navigate("/Parameters")}/>
            <img src="../assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>
          </div>

          <ProgressPart/>
          
          <button className={styles.logoutButton} onClick={logout}>Logout</button>
      </div>
    }
    </>
  );
  
}

export default NavBar;
