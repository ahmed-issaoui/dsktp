import styles from "./ChooseJobBoard.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext, useState} from "react";
import { CampaignContext } from "../../App";



const ChooseJobBoard = () => {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)
  const [isSelectGlassdoorOpen, setIsSelectGlassdoorOpen] = useState(false)
  const [isSelectLinkedinOpen, setIsSelectLinkedinOpen] = useState(false)
  const [isSelectIndeedOpen, setIsSelectIndeedOpen] = useState(false)

  const initialCampaignState = {
    platform: '',
    speed: 1,
    resume: '',
    coverLetter: '',
    questions: {
      allowedToWork: '',
      visaSponsorship: '',
      skills: '',
      experience: '',
      salary: '',
      veteran: '',
      startDate: '',
      currentLocation: '',
      ethnicity: ''
    }
  }
  useEffect(() => {
    setCampaignDetails(initialCampaignState)
    setProgressCount(1)
  }, []);

  useEffect(() => {
    if (!user && !loading) {navigate('/EnterAccount')}
  }, [user, loading]);



  const handleClickOption = (event, platform) => {
    event.stopPropagation()
    if (platform === "glassdoor") {
      setIsSelectGlassdoorOpen(!isSelectGlassdoorOpen)
      setIsSelectLinkedinOpen(false)
      setIsSelectIndeedOpen(false)
    }
    if (platform === "linkedin") {
      setIsSelectLinkedinOpen(!isSelectLinkedinOpen)
      setIsSelectGlassdoorOpen(false)
      setIsSelectIndeedOpen(false)
    }
    if (platform === "indeed") {
      setIsSelectIndeedOpen(!isSelectIndeedOpen)
      setIsSelectGlassdoorOpen(false)
      setIsSelectLinkedinOpen(false)
    }
  }

  const handleLogout = (event, platform) => {
    event.stopPropagation()

    if (platform === "glassdoor") {
      window.api.logoutPpptr("glassdoor");
      setIsSelectGlassdoorOpen(false)


    }
    if (platform === "linkedin") {
      window.api.logoutPpptr("linkedin");
      setIsSelectLinkedinOpen(false)


    }
    if (platform === "indeed") {
      window.api.logoutPpptr("indeed");
      setIsSelectIndeedOpen(false)


    }
    
  }


  const handleReport = (event, platform) => {
    event.stopPropagation()

    window.api.support();
    if (platform === "glassdoor") {
      setIsSelectGlassdoorOpen(false)

    }
    if (platform === "linkedin") {
      setIsSelectLinkedinOpen(false)
    }
    if (platform === "indeed") {
      setIsSelectIndeedOpen(false)
    }
  }
  
  useEffect(() => {
    if (isSelectGlassdoorOpen) {
      setTimeout(() => {
        setIsSelectGlassdoorOpen(false)
      }, 5000);
    }
    if (isSelectLinkedinOpen) {
      setTimeout(() => {
        setIsSelectLinkedinOpen(false)
      }, 5000);
    }
    if (isSelectIndeedOpen) {
      setTimeout(() => {
        setIsSelectIndeedOpen(false)
      }, 5000);
    }

  }, [isSelectGlassdoorOpen, isSelectLinkedinOpen, isSelectIndeedOpen]);  



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
        <div className={styles.section} onClick={()=> {
          setIsSelectGlassdoorOpen(false)
          setIsSelectIndeedOpen(false) 
          setIsSelectLinkedinOpen(false) 
        }}>
          <h1 >Start a new campaign</h1>
          <div className={styles.platformsContainer}>
            
            <div className={styles.platform}
              onClick={()=>alert("Coming soon in the upcoming patch!")}
              style={{opacity: 0.5}}
            >
              <img className={styles.platformLogo} src="./assets/images/glassdoor_logo.png" alt="options" />

              <img className={styles.optionImage} src="./assets/images/options.png" alt="options" onClick={(event)=>handleClickOption(event, "glassdoor")} />
              <div className={styles.optionsContainer} style={{display: isSelectGlassdoorOpen ? '' : 'none' }}>
                <div className={styles.option} onClick={(event)=> handleLogout(event, "glassdoor")}>Logout</div>
                <div className={styles.option} onClick={(event)=> handleReport(event, "glassdoor")}>Report Issue</div>
              </div>

            </div>

            <div className={styles.platform} 
              onClick={()=> {
                setCampaignDetails({
                  ...campaignDetails,
                  platform:'linkedin'
                })
                navigate('/SearchDetails')
              }}

            >
              <img className={styles.platformLogo} src="./assets/images/linkedin_logo.png" alt="options" />
              <img className={styles.optionImage} src="./assets/images/options.png" alt="options" onClick={(event)=>handleClickOption(event, "linkedin")} />
              <div className={styles.optionsContainer} style={{display: isSelectLinkedinOpen ? '' : 'none' }}>
                <div className={styles.option} onClick={(event)=> handleLogout(event, "linkedin")}>Logout</div>
                <div className={styles.option} onClick={(event)=> handleReport(event, "linkedin")}>Report Issue</div>
              </div>
            </div>
            
            <div className={styles.platform}
              onClick={()=>alert("Coming soon in the upcoming patch!")}
              style={{opacity: 0.5}}
            >
              <img className={styles.platformLogo} src="./assets/images/indeed_logo.png" alt="options" />
              <img className={styles.optionImage} src="./assets/images/options.png" alt="options"  onClick={(event)=>handleClickOption(event, "indeed")}/>
              <div className={styles.optionsContainer} style={{display: isSelectIndeedOpen ? '' : 'none' }}>
                <div className={styles.option} onClick={(event)=> handleLogout(event,"indeed")}>Logout</div>
                <div className={styles.option} onClick={(event)=> handleReport(event, "indeed")}>Report Issue</div>
              </div>
            </div>
            
          </div>
        </div>
      }
    </>
  );
};

export default ChooseJobBoard;
