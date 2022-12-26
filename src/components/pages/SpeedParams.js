import { useNavigate, Link } from "react-router-dom";
import styles from "./SpeedParams.module.css";
import { useContext} from "react";
import { CampaignContext } from "../../App";


const SpeedParams = () => {
  let navigate = useNavigate();
  const {campaignDetails, setCampaignDetails} = useContext(CampaignContext)


  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate('/Summary')
    }
  }

  const handleInputChange = (e) => {
    setCampaignDetails({...campaignDetails, speed: e.target.value})
    var speeds = e.target.value;
    window.api.speedParams(speeds);
  }

  

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Speed Parameters</h1>

        <form className={styles.form1}>
          <input type="text" placeholder="Speed" value={campaignDetails.speed}  onChange={(e)=> {handleInputChange(e)}} onKeyDown={(e)=>{handleEnter(e)}}/>
         
          {/* <select className={styles.selectSpeed}>
            <option selected>Normal Speed x1</option>
            <option>Faster but Riskier x1.25</option>
          </select> */}
          
          <div className={styles.buttonPart}>
            <Link to='/PotentialQuestions'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/Summary'>
              <button form="form1" type="button" className={styles.primaryButton}>Next</button>
            </Link>
          </div>
        </form>
      </div>

      <div class="imgPart">
        <img src="../assets/images/img-page3.png" alt="page2img" />
      </div>
    </div>
  );
};

export default SpeedParams;
