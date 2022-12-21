import { Link } from "react-router-dom";
import styles from "./Summary.module.css";

const Summary = () => {
  async function handleLaunch() {window.api.pptr()};

  const handleInputChange = (e) => {
    var platform = e.target.value;
    window.api.platformParams(platform);
  }

  return (
    <div className={styles.section}>

      <div className={styles.textPart}>
        <h1>Campaign Summary</h1>
        <form className={styles.form1}>
          <input type="text" placeholder="Title"/>
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Remote"/>
          <input type="text" placeholder="Speed" />
          <input type="text" placeholder="Platform" onChange={(e)=> {handleInputChange(e)}} />
        </form>

        <div className={styles.buttonPart}>
            <Link to='/SpeedParams'>
              <button form="form1" type="button" className={styles.secondaryButton}>Back </button>
            </Link>

            <Link to='/'>
              <button form="form1" type="button" className={styles.primaryButton} onClick={handleLaunch}>Launch</button>
            </Link>
        </div>

      </div>
      
    </div>
  );
};

export default Summary;
