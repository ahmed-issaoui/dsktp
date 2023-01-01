import { useNavigate, Link } from "react-router-dom";
import styles from "./SpeedParams.module.css";
import { useContext, useEffect, useState} from "react";
import { CampaignContext } from "../../App";


const SpeedParams = () => {
  let navigate = useNavigate();

  const {campaignDetails, setCampaignDetails, setProgressCount} = useContext(CampaignContext)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  useEffect(() => {
    setProgressCount(87)
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/Summary')
    }
  }

  // const handleInputChange = (e) => {
  //   setCampaignDetails({...campaignDetails, speed: e.target.value})
  //   var speeds = e.target.value;
  //   window.api.speedParams(speeds);
  // }

  

  return (
    <div className={styles.section} onClick={()=> {if(isSelectOpen){setIsSelectOpen(false)}}}>

      <div className={styles.textPart}>
        <h1>Speed Parameters</h1>
        {/* <h2>{isSelectOpen? 'Open' : 'Closed' } {campaignDetails.speed}</h2> */}

        <div className={styles.selectComponent}>

          <div className={styles.selectContainer}>
              <div className={styles.selectDisplay}>
                <p>Speed: {(campaignDetails.speed === 1)? "Normal x1" : "Faster x1.5"}</p>
              </div>

              <div className={styles.arrowContainer} onClick={()=> setIsSelectOpen(!isSelectOpen)}>
                  <img src="../assets/images/arrow.png" style={{transform: isSelectOpen ? 'rotate(180deg)' : '' }} alt="arrow"/>
              </div>
          </div>
          <div className={styles.optionsContainer} style={{display: isSelectOpen ? '' : 'none' }}>
            <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, speed: 1})}> Normal x1 </div>
            <div className={styles.option}onClick={()=> setCampaignDetails({...campaignDetails, speed: 1.5})}> Faster x1.5 </div>
          </div>
         

        </div>
        
        <div className={styles.buttonPart}>
            <Link to='/PotentialQuestions'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/Summary'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
          </div>
      </div>

      <div class="imgPart">
        <img src="../assets/images/img-page3.png" alt="page2img" />
      </div>
    </div>
  );
};

export default SpeedParams;
