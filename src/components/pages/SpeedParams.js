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

  const handleEnter = () => {
      navigate('/Summary')
  }


  return (
    <div className={styles.section} onClick={()=> {if(isSelectOpen){setIsSelectOpen(false)}}}>

      <div className={styles.textPart}>
        <h1>Speed Parameters</h1>

        <div className={styles.selectComponent}>
          
          <div className={styles.selectContainer} onClick={()=> setIsSelectOpen(!isSelectOpen)}>
              <div className={styles.selectDisplay}>
                <p>{(campaignDetails.speed === 1)? "Normal Speed x1" : "Faster but Riskier x1.5"}</p>
              </div>
              <div className={styles.arrowContainer} >
                  <img src="../assets/images/arrow.png" style={{transform: isSelectOpen ? 'rotate(180deg)' : '' }} alt="arrow"/>
              </div>
          </div>

          <div className={styles.optionsContainer} style={{display: isSelectOpen ? '' : 'none' }}>
            <div className={styles.option} onClick={()=> setCampaignDetails({...campaignDetails, speed: 1})}> Normal x1 </div>
            <div className={styles.option}onClick={()=> setCampaignDetails({...campaignDetails, speed: 1.5})}> Faster x1.5 </div>
          </div>
         

        </div>
        
        <div className={styles.buttonPart}>
            <div className={styles.secondaryButton} onClick={()=> navigate('/PotentialQuestions')}>
              <img src="../assets/images/arrow.png" alt="back" />
              <p>Back</p>
            </div>

            <div className={styles.primaryButton} onClick={handleEnter}>
              <p>Next</p>
              <img src="../assets/images/arrow.png" alt="back" />
            </div>
        </div>
      </div>

      <div className={styles.imgPart}>
        <img src="../assets/images/speed.png" alt="page2img" />
      </div>
    </div>
  );
};

export default SpeedParams;
