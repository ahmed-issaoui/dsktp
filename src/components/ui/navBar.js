import styles from './navBar.module.css';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, logout} from "../../firebase/firebaseClient"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import ProgressPart from './ProgressPart';


function NavBar() {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)

  useEffect(() => {
    if (loading) {
      return;
    } 

    if (!user && !loading) {navigate('/EnterAccount')}
    if (user && !loading && !error && (!isUserPremium || !user.emailVerified)) {navigate('/UpgradeAccount')}

  }, [user, loading, error, isUserPremium, navigate]);


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
            <img draggable='false' src="./assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon} />
            <img draggable='false' src="./assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>
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
            <img draggable='false' src="./assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon} onClick={()=> navigate("/Parameters")}/>
            <img draggable='false' src="./assets/images/icon-support.png" alt="profile icon" className={styles.navIcon} onClick={()=> navigate("/Parameters")}/>
            <img draggable='false' src="./assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>
          </div>

          <ProgressPart/>
          <div className={styles.logoutButton} onClick={logout}>
              <p>Logout</p>
              <img src="./assets/images/icon-logout.png" alt="back" />
          </div>

          {/* <button className={styles.logoutButton} onClick={logout}>Logout</button> */}
      </div>
    }

    {user && isUserPremium &&
      <div className={styles.preloader}>
          <img src='./assets/images/img-glassdoor.png' alt='1'/>
          <img src='./assets/images/img-indeed.png'alt='2'/>
          <img src='./assets/images/img-linkedin.png' alt='3'/>
          <img src='./assets/images/img-page2.png' alt='4'/>
          <img src='./assets/images/img-page3.png' alt='5'/>
          <img src='./assets/images/speed.png' alt='6'/>
          <img src='./assets/images/arrow.png'alt='7' />
          <img src='./assets/images/enter-img.png' alt='8'/>
          <img src='./assets/images/google-icon.png' alt='9'/>
          <img src='./assets/images/icon-notifications.png' alt='11'/>
          <img src='./assets/images/icon-profile.png'alt='12' />
      </div>
    
    }
    </>
  );
  
}

export default NavBar;
