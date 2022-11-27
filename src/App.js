
import { Routes, Route } from "react-router-dom";
import styles from './App.module.css'
import BackgroundCircle from "./components/ui/backgroundCircle";
import WelcomePage from './components/pages/WelcomePage';
import ChooseJobBoard from './components/pages/ChooseJobBoard';
import SearchDetails from './components/pages/SearchDetails';
import CandidacyDetails from './components/pages/CandidacyDetails';
import PotentialQuestions from "./components/pages/PotentialQuestions";
import SpeedParams from "./components/pages/SpeedParams";
import Summary from "./components/pages/Summary";
import LaunchCampaign from "./components/pages/LaunchCampaign";
import Parameters from "./components/pages/Parameters";
import NotFound from "./components/pages/NotFound";


function App() {
  return (
    <div className={styles.main}>
      <div className={styles.primaryCircle}>
        <BackgroundCircle />
      </div>

      <div className={styles.content}>

        <img src="../assets/images/logo-easyjob.svg" alt="logo easyjob" className={styles.imgLogo}/>

        <Routes>
          <Route path="/hello" element={<WelcomePage />} />
          <Route path="/ChooseJobBoard" element={ <ChooseJobBoard/>} />
          <Route path="/SearchDetails" element={ <SearchDetails/>} />
          <Route path="/CandidacyDetails" element={ <CandidacyDetails/>} />
          <Route path="/PotentialQuestions" element={ <PotentialQuestions/>} />
          <Route path="/" element={ <SpeedParams/>} />
          <Route path="/Summary" element={ <Summary/>} />
          <Route path="/LaunchCampaign" element={ <LaunchCampaign/>} />

          <Route path="/Parameters" element={ <Parameters/>} />
          <Route path="*" element={ <NotFound/>} />
        </Routes>

        <div className={styles.navIcons}>
          <img src="../assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon}/>
          <img src="../assets/images/icon-support.png" alt="support icon" className={styles.navIcon}/>
          <img src="../assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>

        </div>
      </div>

      <div className={styles.secondaryCircle}>
        <BackgroundCircle />
      </div>

    </div>
  );
}

export default App;
