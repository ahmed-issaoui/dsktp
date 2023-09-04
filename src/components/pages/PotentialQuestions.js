import { useNavigate, Link } from "react-router-dom";
import styles from "./PotentialQuestions.module.css";
import { GlobalContext } from "../../context/context";
import { useContext, useEffect} from "react";


const PotentialQuestions = () => {
  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(GlobalContext)
  
  useEffect(() => {
    setProgressCount(72)
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext()
    }
  }
  

  const handleNext = () => {
      navigate('/SpeedParams')
  }

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Possible Questions in Platforms</h1>
        <form className={styles.form1}>
          <textarea type="text" placeholder="Are you allowed to work in the country you're applying to?" 
              value={campaignDetails.questions.allowedToWork} 
              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  allowedToWork: e.target.value
                }
              })} 
              onKeyDown={(e)=>{handleEnter(e)}}></textarea>
          <textarea type="text" placeholder="Do you need visa sponsorship?" 
              value={campaignDetails.questions.visaSponsorship} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  visaSponsorship: e.target.value
                }
              })}

              onKeyDown={(e)=>{handleEnter(e)}}></textarea>

          <textarea type="text" placeholder="How many years do you have in the skill?" 
              value={campaignDetails.questions.skills} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  skills: e.target.value
                }
              })} 
          
            onKeyDown={(e)=>{handleEnter(e)}}></textarea>

          <textarea type="text" placeholder="Are you an army veteran?" 
              value={campaignDetails.questions.veteran} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  veteran: e.target.value
                }
              })} 
            onKeyDown={(e)=>{handleEnter(e)}}></textarea>

          <textarea type="text" placeholder="Where are you located right now?" 
              value={campaignDetails.questions.currentLocation} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  currentLocation: e.target.value
                }
              })} 
            onKeyDown={(e)=>{handleEnter(e)}} ></textarea>

          <textarea type="text" placeholder="Do you have a bachelor degree?" 
              value={campaignDetails.questions.degree} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  degree: e.target.value
                }
              })}

              onKeyDown={(e)=>{handleEnter(e)}}></textarea>
        </form>

        <div className={styles.buttonPart}>
            <div className={styles.secondaryButton} onClick={()=> navigate('/CandidacyDetails')}>
              <img src="./assets/images/arrow.png" alt="back" />
              <p>Back</p>
            </div>

            <div className={styles.primaryButton} onClick={handleNext}>
              <p>Next</p>
              <img src="./assets/images/arrow.png" alt="back" />
            </div>
        </div>

        

      </div>
      
    </div>
  );
};

export default PotentialQuestions;
