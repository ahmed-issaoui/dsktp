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
    setProgressCount(13)
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext()
    }
  }
  

  const handleNext = () => {
    if (!campaignDetails.jobTitle || !campaignDetails.location || !campaignDetails.remote) {
      setIsMissingInput(true);

      setTimeout(() => {
        setIsMissingInput(false);
      }, 1200);
    }
    if (campaignDetails.jobTitle && campaignDetails.location && campaignDetails.remote) {
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
                    <p style={{opacity: (campaignDetails.jobTitle || campaignDetails.location)? '1' : '0.5'}}>Remote: {(campaignDetails.remote === true)? "Yes" : "No"}</p>
                  </div>
                  <div className={styles.arrowContainer}>
                      <img src="../assets/images/arrow.png" style={{transform: isSelectOpen ? 'rotate(180deg)' : '' }} alt='arrow'/>
                  </div>
              </div>
              
              <div className={styles.optionsContainer} style={{display: isSelectOpen ? '' : 'none' }}>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: true})}>Yes</div>
                <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, remote: false})}>No </div>
              </div>
         
          </div>

          {/* <div>
               <p style={{display: "inline-block", marginRight: "3rem"}}>Remote</p>
              <label for="yes">Yes</label>
              <input type="radio" id="yes" name="answer" value="yes" checked/>
              <label for="no">No</label>
              <input type="radio" id="no" name="answer" value="no"/> 
          </div> */}
{/* 
          <input 
              type="text" placeholder="Remote" 
              value={campaignDetails.remote} 
              onChange={(e) => setCampaignDetails({...campaignDetails, remote: e.target.value})} 
              onKeyDown={(e)=>{handleEnter(e)}} 
              className={(isMissingInput && !campaignDetails.remote) ? styles.missingInput : null} 
          /> */}
          <div className={styles.buttonPart} >
            <Link to='/ChooseJobBoard'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

              <button form="form1" type="button" className={styles.primaryButton} onClick={handleNext}>Next</button>
           </div>
        </form>
      </div>


    </div>
  )
}

export default SearchDetails