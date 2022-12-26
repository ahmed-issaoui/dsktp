import { Link } from "react-router-dom";
import styles from "./Summary.module.css";
import { useContext} from "react";
import { CampaignContext } from "../../App";

const Summary = () => {
  const {campaignDetails, setCampaignDetails} = useContext(CampaignContext)

  function handleLaunch() {
    window.api.pptr(campaignDetails)
  };

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Campaign Summary</h1>
        <div className={styles.summaryDetails}>
          <div>
            <h3>Platform:</h3>
            <p>{campaignDetails.platform}</p>
          </div>
          <div>
            <h3>Speed:</h3>
            <p>x{campaignDetails.speed}</p>
          </div>
          <div>
            <h3>Job Title:</h3>
            <p>{campaignDetails.jobTitle}</p>
          </div>
          <div>
            <h3>Location:</h3>
            <p>{campaignDetails.location}</p>
          </div>
          <div>
            <h3>Remote:</h3>
            <p>{campaignDetails.remote}</p>
          </div>
          <div>
            <h3>Name:</h3>
            <p>{campaignDetails.name}</p>
          </div>
          <div>
            <h3>Phone:</h3>
            <p>{campaignDetails.phone}</p>
          </div>
          <div>
            <h3>Email:</h3>
            <p>{campaignDetails.email}</p>
          </div>

          <p>Question: {campaignDetails.questions.allowedToWork}</p>
          <p>Question: {campaignDetails.questions.visaSponsorship}</p>
          <p>Question: {campaignDetails.questions.skills}</p>
          <p>Question: {campaignDetails.questions.veteran}</p>
          <p>Question: {campaignDetails.questions.currentLocation}</p>
          <p>Question: {campaignDetails.questions.currentLocation}</p>
        </div>

        <div className={styles.buttonPart}>
            <Link to='/SpeedParams'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/'>
              <button form="form1" type="button" className={styles.primaryButton} onClick={handleLaunch}>Launch</button>
            </Link>
        </div>

      </div>
      
    </div>
  );
};

export default Summary;
