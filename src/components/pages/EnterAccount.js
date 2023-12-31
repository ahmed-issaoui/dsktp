import styles from './EnterAccount.module.css';


import { useContext, useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase/firebaseClient'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from '../ui/loaderSpinner';
import { GlobalContext } from '../../context/context';

function EnterAccount() {

  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount, autopilotCampaigns, setAutopilotCampaigns, user, loading, error, isUserPremium} = useContext(GlobalContext)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(null);

  let navigate = useNavigate();

  
  

  useEffect(() => {

    if (user && !loading && user.emailVerified && isUserPremium) {navigate("/ChooseJobBoard")};
    if (user && !loading && !isUserPremium ) {navigate('/UpgradeAccount')}

    if (errorText) {alert(errorText)}

  }, [user, loading, errorText, error]);



  const submitHandlerLogin = () => {
    if (!email || !password) {
      setErrorText('Please enter email and password')
    }

    logInWithEmailAndPassword(email, password)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitHandlerLogin()
    }
  }

  return ( 
      <div className={styles.section}>
          {loading &&         
              <div className={styles.textPart}>
                  <div className={styles.titlePart}>
                      <LoaderSpinner/>
                  </div>
              </div>
          }

          {!loading && !user &&
          <>
            <div className={styles.imgContainer}>
              <img draggable='false' src="./assets/images/enter-img.png"alt="section7-img"/>
            </div> 
            <div className={styles.textPart}>
                <div className={styles.titlePart}>
                  <h1>Enter Your Account</h1>
                </div>

                <div className={styles.features}>

                <div className={styles.featureElement} onClick={signInWithGoogle} >
                  <img draggable='false' src="./assets/images/google-icon.png" alt="google-icon" className={styles.featureImg}/>
                  <p >Continue with Google</p>
              </div>


                  <form id="form1">
                    <input className={styles.inputElement} type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' onKeyDown={(e)=>{handleEnter(e)}}/><br/>
                    <input className={styles.inputElement} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' onKeyDown={(e)=>{handleEnter(e)}}/>
                  </form>

                  <div className={styles.buttonPart}>
    
                        <button className={styles.primaryButton}  onClick={submitHandlerLogin}>Confirm</button>  

                  </div>
                  
                </div>
              </div> 
              </>
              }
      </div>
  )
}

export default EnterAccount