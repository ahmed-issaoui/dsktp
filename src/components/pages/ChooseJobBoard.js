import styles from "./ChooseJobBoard.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext} from "react";
import { CampaignContext } from "../../App";




const ChooseJobBoard = () => {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)

  const initialCampaignState = {
    platform: '',
    speed: 1,
    jobTitle: '',
    location: '',
    remote: true,
    name: '',
    phone: '',
    email: '',
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



  return (
    <> 

    {user &&
        <div className={styles.section}>
          <h1 >Start a new campaign</h1>
          <div className={styles.channels}>
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
