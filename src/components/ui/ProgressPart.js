import styles from './ProgressPart.module.css';
import { useContext } from 'react';
import { CampaignContext } from "../../App";

export default function ProgressPart() {

    const {progressCount} = useContext(CampaignContext)

    

    const widthDiv = {width: "17rem"};

    return (
      <>
      { !(progressCount===0) &&
          <div className={styles.progressPart} style={widthDiv}>
      
            <div className={styles.progressBar} style={widthDiv}>
              <div className={styles.totalBar} style={widthDiv}>
                <div
                  className={styles.partialBar}
                  style={{ width: `${progressCount}%`, transition: "width 1.5s"}}
                ></div>
              </div>
            </div>
      
            <div className={styles.progressNumber}>
              <p className={styles.number}> {progressCount}%</p>
            </div>
          </div>
      }
      </>
    );
}