import styles from "./Autopilot.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext, useState} from "react";
import { CampaignContext } from "../../App";



const Autopilot = () => {

  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {campaignDetails, setCampaignDetails, setProgressCount, autopilotCampaigns, setAutopilotCampaigns} = useContext(CampaignContext)

  
  useEffect(() => {
    setProgressCount(1)
  }, []);

  useEffect(() => {
    if (!user && !loading) {navigate('/EnterAccount')}
  }, [user, loading]);
  
  useEffect(()=> {
    const loadUserData = async () => {
    
      const loadedData = await window.api.loadUserData()

       setAutopilotCampaigns(loadedData.autopilotCampaignsList.reverse())
    }

    loadUserData()

  },[])


  const handleDeleteAutopilot = (reference) => {
    window.api.deleteAutopilot(reference)
  }

  return (
    <> 

    {user &&
        <div className={styles.section} >
              <div className={styles.titlePart}>
                  <h1 >Autopilot</h1>
                  <button className={styles.addNew} onClick={()=> navigate('/NewAutopilot')}>Add New</button>
              </div>

              <div className={styles.wholeTable}>
                  <div className={styles.tableLegend}>
                          <div className={styles.campaignDetailBig}>
                              <p>Title</p>
                            </div>
                            <div className={styles.campaignDetailBig}>
                              <p>Location</p>
                            </div>
                            <div className={styles.campaignDetailSmall}>
                              <p>Remote</p>
                            </div>
                            <div className={styles.campaignDetailSmall}>
                              <p>Percentage</p>
                            </div>
                            <div className={styles.campaignDetailSmall}>
                              <p></p>
                            </div>
                  </div>
                  <div className={styles.campaignsContainer}>
              
                { autopilotCampaigns.map((campaign, index) => {
                  if (campaign) {
                    return (
                      
                      <div key={index} className={styles.campaignElement}>
                        <div className={styles.campaignDetailBig}>
                          <p>{campaign.jobTitle}</p>
                        </div>
                        <div className={styles.campaignDetailBig}>
                          <p>{campaign.location}</p>
                        </div>
                        <div className={styles.campaignDetailSmall}>
                          <p>{campaign.remote}</p>
                        </div>
                        <div className={styles.campaignDetailSmall}>
                          <p>{campaign.percentage}</p>
                        </div>
                        <div className={styles.campaignDetailSmall}>
                          <p onClick={()=>{handleDeleteAutopilot()}}>Delete</p> 
                        </div>
                      </div>
                      )
                  } else {
                    return (
                      <div>
                        <p style={{opacity:"0.5"}}>No active autopilot campaign</p>
                      </div>
                    )
                  }

                })}
                
              </div>
              </div>
              
              

              
        </div>
      }
    </>
  );
};

export default Autopilot;
