import styles from './loaderSpinner.module.css';

function LoaderSpinner() {
  return (

  <div className={styles.loader}>
    <div className={styles.spinner}>
        <div className={styles.spinnerIcon}>
        </div>
    </div>
  </div>
  );
  
}

export default LoaderSpinner;
