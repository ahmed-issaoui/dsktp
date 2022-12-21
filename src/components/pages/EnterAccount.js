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
  }, [user, loading, navigate]);



  const submitHandlerLogin = () => {
    if (!email || !password) {
      setErrorText('Please enter email and password')
      return 
    }

    logInWithEmailAndPassword(email, password)
  }

  const handleRegister = () => {
    window.api.registerAccount();
  }

  const handleForgotPassword = () => {
    window.api.forgot();
  }

  return ( 
  <>

    {loading &&         
        <div className={styles.textPart}>
            <div className={styles.titlePart}>
                <LoaderSpinner/>
            </div>
        </div>
    }

    {!loading && 
      <div className={styles.section}>
        {/* <div className={styles.imgContainer}>
          <Image src="/images/section7-img.png"alt="section7-img"width={538} height={538} priority={true}/>
        </div>  */}

        <div className={styles.textPart}>
            <div className={styles.titlePart}>
              <h2>Enter Your Account</h2>
              {!user && <h2>You are not logged in</h2>}
              {user && <h2>You are logged in</h2>}
              {user && isUserPremium && <h1>You are also premium</h1>}

              {errorText && <div className={styles.errorText}>{errorText}</div>}
            </div>

            <div className={styles.features}>

              <div className={styles.featureElement} onClick={signInWithGoogle}  >
                <div className={styles.featureImg}>
                  {/* <Image src="/images/google-icon.png" alt="google-icon" width={38} height={40} priority={true}/> */}
                </div>
                <p >Continue with Google</p>
              </div>


              <form id="form1">
                <input className={styles.inputElement} type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/><br/>
                <input className={styles.inputElement} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/>
              </form>
              <div className={styles.buttonPart}>
                <div className={styles.btnImgContainer}>
                  {/* <img src="/images/option-button.png" alt="option-button" /> */}
                </div>
                    <button className={styles.submitButton} form="form1" type="button" onClick={submitHandlerLogin}>Confirm</button>  

              </div>
              <div><p onClick={handleForgotPassword}>Forgot Password</p></div>
              <div><p onClick={handleRegister}>Register</p></div>
              
            </div>
          </div>
      </div>
    }
  </>
  )
}

export default EnterAccount