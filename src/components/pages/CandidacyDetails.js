import { useNavigate, Link } from "react-router-dom";
import styles from "./CandidacyDetails.module.css";
import { useContext, useState, useEffect} from "react";
import { CampaignContext } from "../../App";

const CandidacyDetails = () => {
  let navigate = useNavigate();

  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount} = useContext(CampaignContext)

  const [isMissingInput, setIsMissingInput] = useState(false)

  useEffect(() => {
    setProgressCount(42)
  }, []);

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

  const handleUploadCV = (e) => {
    
    let file = e.target.files[0];
    
    if (file) {
      setCampaignDetails({...campaignDetails, resume: file}) ;
    }
    if (!file) {
      setCampaignDetails({...campaignDetails, resume: file})
    }
  }
  const handleUploadCoverLetter = (e) => {
    
    let file = e.target.files[0];
    
    if (file) {
      setCampaignDetails({...campaignDetails, coverLetter: file}) ;
    }
    if (!file) {
      setCampaignDetails({...campaignDetails, coverLetter: file})
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

          
          <div className={styles.uploadPart}>
            <div className={styles.upload}>
                <button 
                  className={(isMissingInput && !campaignDetails.resume) ? styles.missingUploadButton : styles.uploadButton} 
                  type="button" >Upload CV </button>
                <input 
                    type="file" 
                    className={styles.uploadInput} 
                    onChange={(e) => handleUploadCV(e)}/>
            </div>

            <div className={styles.upload}>
                <button className={styles.uploadButton} type="button" >Cover Letter </button>
                <input 
                    className={styles.uploadInput} 
                    type="file" 
                    onChange={(e) => handleUploadCoverLetter(e)}/>
            </div>
          </div>

          <p>{campaignDetails.resume? campaignDetails.resume.name : 'No Resume'}</p>
          <p>{campaignDetails.coverLetter? campaignDetails.coverLetter.name : 'No Cover Letter'}</p>

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
