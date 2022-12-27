import styles from './ProgressPart.module.css';

export default function ProgressPart() {
    let progress = 2;

    

    const widthDiv = {width: "17rem"};

    return (

      
      <div className={styles.progressPart} style={widthDiv}>
  
        <div className={styles.progressBar} style={widthDiv}>
          <div className={styles.totalBar} style={widthDiv}>
            <div
              className={styles.partialBar}
              style={{ width: `${progress}rem`, transition: "width 3s"}}
            ></div>
          </div>
        </div>
  
        <div className={styles.progressNumber}>
          <p className={styles.number}> {progress}%</p>
        </div>
      </div>
  
    );
}