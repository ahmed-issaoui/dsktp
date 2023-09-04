import styles from "./ChooseJobBoard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState} from "react";
import { GlobalContext } from "../../context/context";



const ChooseJobBoard = () => {
  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount, autopilotCampaigns, setAutopilotCampaigns, user, loading, error, isUserPremium, checkLoading} = useContext(GlobalContext)
  const [isSelectGlassdoorOpen, setIsSelectGlassdoorOpen] = useState(false)
  const [isSelectLinkedinOpen, setIsSelectLinkedinOpen] = useState(false)
  const [isSelectIndeedOpen, setIsSelectIndeedOpen] = useState(false)

  
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

      {/* {user && 
        <div className={styles.topNav}>
              <p onClick={()=> { navigate('/SearchDetails')}}>Manage Sessions</p>
              <p onClick={()=> { navigate('/Autopilot')}}>Autopilot</p>
              <p onClick={()=> { navigate('/Dashboard')}}>History</p>
        </div>
      } */}

    {user &&
        <div className={styles.section}>
          <h1 >Start a new campaign</h1>

          <div className={styles.platformsContainer}>
              <img
                draggable='false'
                src="./assets/images/img-glassdoor.png"
                alt="glassdoor"
                className={styles.glassdoor}
                onClick={()=> {
                  setCampaignDetails({
                    ...campaignDetails,
                    platform:'glassdoor'
                  })
                  navigate('/SearchDetails')
                }}
              />

              <img
                draggable='false'
                src="./assets/images/img-linkedin.png"
                alt="linkedin"
                className={styles.linkedin}
                onClick={()=> {
                  setCampaignDetails({
                    ...campaignDetails,
                    platform:'linkedin'
                  })
                  navigate('/SearchDetails')
                }}
              />

              <img
                draggable='false'
                src="./assets/images/img-indeed.png"
                alt="indeed"
                className={styles.indeed}
                onClick={()=> {
                  setCampaignDetails({
                    ...campaignDetails,
                    platform:'indeed'
                  })
                  navigate('/SearchDetails')
                }}
              />


          </div>
        </div>
      }
    </>
  );
};

export default ChooseJobBoard;

