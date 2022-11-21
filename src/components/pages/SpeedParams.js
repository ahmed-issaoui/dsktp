import { Link } from "react-router-dom";
import styles from "./SpeedParams.module.css";

const SpeedParams = () => {

  const handleInputChange = (e) => {
    // var inputData = e.target.value
    var speed = e.target.value;
    window.api.speedParams(speed);
  }

  

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Speed Parameters</h1>

        <form className={styles.form1}>
          <input type="text" placeholder="Speed" onChange={(e)=> {handleInputChange(e)}} />
         
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
