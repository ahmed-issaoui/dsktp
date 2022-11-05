// import "./App.css";

import styles from './App.module.css'
import { Routes, Route } from "react-router-dom";
import WelcomePage from './components/pages/WelcomePage';
import BackgroundCircle from "./components/ui/backgroundCircle";
import ChooseJobBoard from './components/pages/ChooseJobBoard';

function App() {
  return (
    <div className={styles.main}>
      <div className={styles.primaryCircle}>
        <BackgroundCircle />
      </div>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
		<Route path="jobboard" element={ <ChooseJobBoard/>} />
      </Routes>

      <div className={styles.secondaryCircle}>
        <BackgroundCircle />
      </div>

    </div>
  );
}

export default App;
