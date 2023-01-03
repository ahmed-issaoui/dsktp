import styles from './EnterAccount.module.css';


import { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase/firebaseClient'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import usePremiumStatus from '../../firebase/usePremiumStatus';
import LoaderSpinner from '../ui/loaderSpinner';


function EnterAccount() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [user, loading] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(user)
  let navigate = useNavigate();

  
  

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {navigate("/ChooseJobBoard")};
    if (errorText) {alert(errorText)}

  }, [user, loading, errorText]);



  const submitHandlerLogin = () => {
    if (!email || !password) {
      setErrorText('Please enter email and password')
      return 
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
                  {isUserPremium && <h2>You are premium</h2>}

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

                  {/* {errorText && <div className={styles.errorText}>{errorText}</div>}  */}

                  
                </div>
              </div> 
              </>
              }
      </div>
  )
}

export default EnterAccount