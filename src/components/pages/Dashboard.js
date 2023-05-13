import styles from "./Dashboard.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext, useState} from "react";
import { CampaignContext } from "../../App";



const Dashboard = () => {

  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)

  
  useEffect(() => {
    setProgressCount(1)
  }, []);

  useEffect(() => {
    if (!user && !loading) {navigate('/EnterAccount')}
  }, [user, loading]);
  
  useEffect(()=> {
    const loadUserData = async () => {
    
      const loadedData = await window.api.loadUserData()

      await setCampaignDetails({...campaignDetails, 
        name: loadedData.name,
        email: loadedData.email, 
        phone: loadedData.phone
      })
    }

    loadUserData()

  },[])



  return (
    <> 

    {user &&
        <div className={styles.section} >
              <div className={styles.titlePart}>
                  <h1 >Dashboard</h1>
                  <p>Manage Sessions</p>

              </div>

              <div className={styles.widgetsContainer}>
                  <div className={styles.widgetHistory}> 
                    <h3>Last 14 Days</h3>
                    <div className={styles.candlesContainer}>
                      <div className={styles.candle} style={{ height: `${100}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${75}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${0}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${5}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${42}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${5}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${10}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${51}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${55}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${34}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${80}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${5}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${20}%`, }}></div>
                      <div className={styles.candle} style={{ height: `${5}%`, }}></div>
                      
                    </div>
                  </div>

                  <div className={styles.smallerWidgetsContainer}>
                      
                      <div className={styles.widgetAutopilot}> 
                        <p>Autopilot</p>
                      </div>
                      <div className={styles.widgetCampaign} onClick={()=> navigate('/ChooseJobBoard')}> 
                        <p >Start Campaign</p>
                      </div>
                  </div>

              </div>
        </div>
      }
    </>
  );
};

export default Dashboard;
