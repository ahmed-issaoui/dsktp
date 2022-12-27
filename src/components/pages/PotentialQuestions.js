import { useNavigate, Link } from "react-router-dom";
import styles from "./PotentialQuestions.module.css";
import { CampaignContext } from "../../App";
import { useContext, useEffect} from "react";


const PotentialQuestions = () => {
  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)
  
  useEffect(() => {
    setProgressCount(72)
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/SpeedParams')
    }
  }
  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Possible Questions</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Are you allowed to work in this country?" 
              value={campaignDetails.questions.allowedToWork} 
              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  allowedToWork: e.target.value
                }
              })} 
              onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="text" placeholder="Do you need visa sponsorship?" 
              value={campaignDetails.questions.visaSponsorship} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  visaSponsorship: e.target.value
                }
              })}

              onKeyDown={(e)=>{handleEnter(e)}} />

          <input type="text" placeholder="How many years do you have in the skill?" 
              value={campaignDetails.questions.skills} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  skills: e.target.value
                }
              })} 
          
            onKeyDown={(e)=>{handleEnter(e)}} />

          <input type="text" placeholder="Are you an army veteran?" 
              value={campaignDetails.questions.veteran} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  veteran: e.target.value
                }
              })} 
            onKeyDown={(e)=>{handleEnter(e)}} />

          <input type="text" placeholder="Where are you located right now?" 
              value={campaignDetails.questions.currentLocation} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  currentLocation: e.target.value
                }
              })} 
            onKeyDown={(e)=>{handleEnter(e)}} />

          <input type="text" placeholder="Do you have a bachelor degree?" 
              value={campaignDetails.questions.degree} 

              onChange={(e) => setCampaignDetails({
                ...campaignDetails, 
                questions: {
                  ...campaignDetails.questions, 
                  degree: e.target.value
                }
              })}

              onKeyDown={(e)=>{handleEnter(e)}} />
        </form>

        <div className={styles.buttonPart}>
            <Link to='/CandidacyDetails'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/SpeedParams'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
        </div>

      </div>
      
    </div>
  );
};

export default PotentialQuestions;
