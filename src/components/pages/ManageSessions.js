import styles from "./ManageSessions.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext, useState} from "react";
import { GlobalContext } from "../../context/context";

import { Link } from "react-router-dom";

const ManageSessions = () => {

  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount, autopilotCampaigns, setAutopilotCampaigns, user, loading, error, isUserPremium, checkLoading} = useContext(GlobalContext)

  const [isLinkedinLoggedin, setIsLinkedinLoggedin] = useState(false)
  const [isGlassdoorLoggedin, setIsGlassdoorLoggedin] = useState(true)
  const [isIndeedLoggedin, setIsIndeedLoggedin] = useState(false)

  const [loadingOperation, setLoadingOperation] = useState(false)

  useEffect(() => {
    setProgressCount(1)
  }, []);

  useEffect(() => {
    if (!user && !loading) {navigate('/EnterAccount')}
  }, [user, loading]);
  
  useEffect(()=> {
      const getStatus = async () => {
        try {
              const dataReceived = await window.api.getLoginStatus()
              const loginStatus = JSON.parse(dataReceived)

              setIsLinkedinLoggedin(loginStatus.linkedinStatus)
              setIsGlassdoorLoggedin(loginStatus.glassdoorStatus)
              setIsIndeedLoggedin(loginStatus.indeedStatus)
        } catch(e){
          console.error(e)
        }
      }

      getStatus()

  },[loadingOperation])

  const handleLogoutFromPlatform = (platform) => {
    window.api.logoutFromPlatform(platform)
    setLoadingOperation(true) 
    setTimeout(() => {
      setLoadingOperation(false) 

    }, 1500);
  }

  const handleLoginToPlatform = (platform) => {
    window.api.loginToPlatform(platform)
    setLoadingOperation(true) 
    setTimeout(() => {
      setLoadingOperation(false) 

    }, 1500);
  }




  return (
    <> 

    {user && !loadingOperation &&
        <div className={styles.section} >

              <h1 >Manage Sessions</h1>
              <div className={styles.sessions} >

                <div className={styles.platform}>
                  <h3>Linkedin</h3>
                  <div className={styles.buttonPart} >
                    {isLinkedinLoggedin && <button className={styles.button}  onClick={()=>handleLogoutFromPlatform("linkedin")}>Logout</button>}
                    {!isLinkedinLoggedin && <button className={styles.button} onClick={()=>handleLoginToPlatform("linkedin")}>Signin</button>}
                  </div>
                </div>

                <div className={styles.platform}>
                  <h3>Glassdoor</h3>
                  <div className={styles.buttonPart} >
                    {isGlassdoorLoggedin && <button className={styles.button} onClick={()=>handleLogoutFromPlatform("glassdoor")}>Logout</button>}
                    {!isGlassdoorLoggedin && <button className={styles.button} onClick={()=>handleLoginToPlatform("glassdoor")}>Signin</button>}
                  </div>
                </div>

                <div className={styles.platform}>
                  <h3>Indeed</h3>
                  <div className={styles.buttonPart} >
                    {isIndeedLoggedin && <button className={styles.button}  onClick={()=>handleLogoutFromPlatform("indeed")}>Logout</button>}
                    {!isIndeedLoggedin && <button className={styles.button}  onClick={()=>handleLoginToPlatform("indeed")}>Signin</button>}
                  </div>
                </div>


              </div>
              
              <Link to='/ChooseJobBoard'>
                <button type="button" className={styles.primaryButton}>Back</button>
              </Link>

              
        </div>
      }
    </>
  );
};

export default ManageSessions;

