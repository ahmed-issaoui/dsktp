import { useNavigate, Link } from "react-router-dom";
import styles from "./CandidacyDetails.module.css";
import { useContext, useState, useEffect, useRef} from "react";
import { CampaignContext } from "../../App";

const CandidacyDetails = () => {
  let navigate = useNavigate();

  const {campaignDetails, setCampaignDetails, progressCount, setProgressCount} = useContext(CampaignContext)

  const [isMissingInput, setIsMissingInput] = useState(false)

  useEffect(() => {
    setProgressCount(42)
    
  }, []);

  useEffect(() => {
    if (campaignDetails.resume.size > 2000000) {alert('Resume file size is too big. It might get rejected by the job board')}
    
  }, [campaignDetails.resume]);

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

  const hiddenInputCV = useRef(null);
  const hiddenInputCover = useRef(null);

  const handleClickCV = () => {
    hiddenInputCV.current.click();

  }
  const handleClickCover = () => {
    hiddenInputCover.current.click()

  }


  const handleUploadCV = (e) => {
    
    let file = e.target.files[0];
    
    if (file) {
      setCampaignDetails({
        ...campaignDetails, 
        resume: {
          name: file.name,
          size: file.size,
          path: file.path
        } 
      }) ;
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
                  type="button"
                  title= {campaignDetails.resume.name? campaignDetails.resume.name: ''}
                  style={{backgroundColor: campaignDetails.resume.name? '#695DF5' : 'rgba(0, 0, 0, 0)'}}
                  onClick={handleClickCV}>
                    {campaignDetails.resume.name? campaignDetails.resume.name : 'Upload CV'} 
                </button>
                  
                <input 
                    type="file" 
                    className={styles.uploadInput} 
                    ref={hiddenInputCV}
                    onChange={(e) => handleUploadCV(e)}
                    />
            </div>

            <div className={styles.upload}>
                <button 
                    className={styles.uploadButton} 
                    type="button" 
                    onClick={handleClickCover}
                    >Cover Letter </button>
                <input 
                    className={styles.uploadInput} 
                    type="file" 
                    ref={hiddenInputCover}
                    onChange={(e) => handleUploadCoverLetter(e)}

                    />
            </div>
          </div>


        </form>
        
        <div className={styles.buttonPart}>
            <div className={styles.secondaryButton} onClick={()=> navigate('/SearchDetails')}>
              <img src="./assets/images/arrow.png" alt="back" />
              <p>Back</p>
            </div>

            <div className={styles.primaryButton} onClick={handleNext}>
              <p>Next</p>
              <img src="./assets/images/arrow.png" alt="back" />
            </div>
        </div>
        
      </div>

      <div className={styles.imgPart}>
        <img src="./assets/images/img-page3.png" alt="page2img" />
      </div>
    </div>
  );
};

export default CandidacyDetails;
