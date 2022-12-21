import { useNavigate, Link } from "react-router-dom";
import styles from "./PotentialQuestions.module.css";

const PotentialQuestions = () => {
  let navigate = useNavigate();

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
          <input type="text" placeholder="Are you allowed to work in this country?" onKeyDown={(e)=>{handleEnter(e)}}/>
          <input type="text" placeholder="Do you need visa sponsorship?" onKeyDown={(e)=>{handleEnter(e)}} />
          <input type="text" placeholder="How many years do you have in the skill?" onKeyDown={(e)=>{handleEnter(e)}} />
          <input type="text" placeholder="Are you an army veteran?" onKeyDown={(e)=>{handleEnter(e)}} />
          <input type="text" placeholder="Where are you located right now?" onKeyDown={(e)=>{handleEnter(e)}} />
          <input type="text" placeholder="Do you have a bachelor degree?" onKeyDown={(e)=>{handleEnter(e)}} />
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
