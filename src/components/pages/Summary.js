import { Link, useNavigate } from "react-router-dom";
import styles from "./Summary.module.css";
import { useContext, useEffect} from "react";
import { CampaignContext } from "../../App";

const Summary = () => {
  let navigate = useNavigate();

  const {campaignDetails, setProgressCount} = useContext(CampaignContext)
  
  useEffect(() => {
    setProgressCount(98)
  }, []);

  function handleLaunch() {
    window.api.pptr(campaignDetails)
    navigate('/')

  };

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Campaign Summary</h1>
        <div className={styles.summaryDetails}>
          <div className={styles.column}>
              <div className={styles.detailsContainerSmall}>
                <div className={styles.element}>
                  <h3>Platform</h3>
                  <p>{campaignDetails.platform}</p>
                </div>
                <div className={styles.element}>
                  <h3>Speed</h3>
                  <p>{campaignDetails.speed}</p>
                </div>
              </div>

              <div className={styles.detailsContainerBig}>
                <div className={styles.element}>
                  <h3>Job Title</h3>
                  <p>{campaignDetails.jobTitle}</p>
                </div>
                <div className={styles.element}>
                  <h3>Location</h3>
                  <p>{campaignDetails.location}</p>
                </div>
                <div className={styles.element}>
                  <h3>Remote</h3>
                  <p>{campaignDetails.remote? 'Yes' : 'No'}</p>
                </div>
              </div>
          </div>
          <div className={styles.column}>

              <div className={styles.detailsContainerBig}>
                <div className={styles.element}>
                  <h3>Name</h3>
                  <p>{campaignDetails.name}</p>
                </div>
                <div className={styles.element}>
                  <h3>Phone</h3>
                  <p>{campaignDetails.phone}</p>
                </div>
                <div className={styles.element}>
                  <h3>Email</h3>
                  <p>{campaignDetails.email}</p>
                </div>
              </div>

              <div className={styles.detailsContainerSmall}>
                <div className={styles.element}>
                  <h3>Resume</h3>
                  <p>{campaignDetails.resume? campaignDetails.resume.name : 'No' }</p>
                </div>
                <div className={styles.element}>
                  <h3>Cover Letter</h3>
                  <p>{campaignDetails.coverLetter? campaignDetails.coverLetter.name : 'No' }</p>
                </div>
              </div>
          </div>


        </div>

        <div className={styles.buttonPart}>

            <div className={styles.secondaryButton} onClick={()=> navigate('/SpeedParams')}>
              <img src="./assets/images/arrow.png" alt="back" />
              <p>Back</p>
            </div>

            <div className={styles.primaryButton} onClick={handleLaunch}>
              <img src="./assets/images/icon-launch.png" alt="launch" />
              <p>Launch</p>
            </div>
        </div>

      </div>
      
    </div>
  );
};

export default Summary;
