import { useNavigate, Link } from "react-router-dom";
import styles from "./CandidacyDetails.module.css";
import { useContext, useState} from "react";
import { CampaignContext } from "../../App";

const CandidacyDetails = () => {
  let navigate = useNavigate();

  const {campaignDetails, setCampaignDetails} = useContext(CampaignContext)

  const [isMissingInput, setIsMissingInput] = useState(false)


  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext()
    }
  }
  

  const handleNext = () => {
    if (!campaignDetails.name || !campaignDetails.phone || !campaignDetails.email) {
      setIsMissingInput(true);

      setTimeout(() => {
        setIsMissingInput(false);
      }, 1200);
    }
    if (campaignDetails.name && campaignDetails.phone && campaignDetails.email) {
      navigate('/PotentialQuestions')
    }
  }
  
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Candidacy Details</h1>

        <form className={styles.form1}>
          <input 
              type="text" placeholder="Name" 
              value={campaignDetails.name} 
              onChange={(e) => setCampaignDetails({...campaignDetails, name: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}}
              className={(isMissingInput && !campaignDetails.name) ? styles.missingInput : null} 

          />
          <input 
              type="text" placeholder="Phone" 
              value={campaignDetails.phone} 
              onChange={(e) => setCampaignDetails({...campaignDetails, phone: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}}
              className={(isMissingInput && !campaignDetails.phone) ? styles.missingInput : null} 

          />
          <input 
              type="text" placeholder="Email" 
              value={campaignDetails.email} 
              onChange={(e) => setCampaignDetails({...campaignDetails, email: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}}
              className={(isMissingInput && !campaignDetails.email) ? styles.missingInput : null} 

          />
          <input type="file" placeholder="Add Resume" onKeyDown={(e)=>{handleEnter(e)}}/>

          <div className={styles.buttonPart}>
            <Link to='/SearchDetails'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <button form="form1" type="button" className={styles.primaryButton} onClick={handleNext}>Next</button>
          </div>
        </form>
      </div>

      <div class="imgPart">
        <img src="../assets/images/img-page3.png" alt="page2img" />
      </div>
    </div>
  );
};

export default CandidacyDetails;
