import { useNavigate, Link } from "react-router-dom";
import { CampaignContext } from "../../App";
import { useContext, useState, useEffect} from "react";
import styles from './SearchDetails.module.css'


const SearchDetails = () => {
  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)
  
  const [isMissingInput, setIsMissingInput] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  useEffect(() => {
    setProgressCount(24)
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext()
    }
  }
  

  const handleNext = () => {
    if (!campaignDetails.jobTitle || !campaignDetails.location) {
      setIsMissingInput(true);

      setTimeout(() => {
        setIsMissingInput(false);
      }, 1200);
    }
    if (campaignDetails.jobTitle && campaignDetails.location) {
      navigate('/CandidacyDetails')
    }
  }

  return (
    <div className={styles.section}  onClick={()=> {if(isSelectOpen){setIsSelectOpen(false)}}}>

      <div className={styles.imgPart}>
        <img src="./assets/images/img-page2.png" alt="page2img" />
      </div>

      <div className={styles.textPart}>
        <h1>Search Details</h1>
        <form className={styles.form1}>
          <input 
              type="text" placeholder="Job Title"  
              value={campaignDetails.jobTitle} 
              onChange={(e) => setCampaignDetails({...campaignDetails, jobTitle: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}}
              className={(isMissingInput && !campaignDetails.jobTitle) ? styles.missingInput : null} 
              />
              
          <input 
              type="text" placeholder="Location" 
              value={campaignDetails.location} 
              onChange={(e) => setCampaignDetails({...campaignDetails, location: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}} 
              className={(isMissingInput && !campaignDetails.location) ? styles.missingInput : null} 
          />
          <div className={styles.selectComponent}>

              <div className={styles.selectContainer} onClick={()=> setIsSelectOpen(!isSelectOpen)}>
                  <div className={styles.selectDisplay}>
                    <p style={{opacity: (campaignDetails.jobTitle || campaignDetails.location)? '1' : '0.5'}}>Remote: {campaignDetails.remote}</p>
                  </div>
                  <div className={styles.arrowContainer}>
                      <img src="./assets/images/arrow.png" style={{transform: isSelectOpen ? 'rotate(180deg)' : '' }} alt='arrow'/>
                  </div>
              </div>
              
              <div className={styles.optionsContainer} style={{display: isSelectOpen ? '' : 'none' }}>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: "All"})}>All</div>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: "Onsite Only"})}>Onsite Only</div>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: "Remote Only"})}>Remote Only</div>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: "Hybrid Only"})}>Hybrid Only</div>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: "Remote + Hybrid"})}>Remote + Hybrid</div>
              </div>
         
          </div>

          <div className={styles.buttonPart}>
            <div className={styles.secondaryButton} onClick={()=> navigate('/ChooseJobBoard')}>
              <img src="./assets/images/arrow.png" alt="back" />
              <p>Back</p>
            </div>

            <div className={styles.primaryButton} onClick={handleNext}>
              <p>Next</p>
              <img src="./assets/images/arrow.png" alt="back" />
            </div>
          </div>


        </form>
      </div>


    </div>
  )
}

export default SearchDetails