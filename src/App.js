
import { Routes, Route } from "react-router-dom";
import styles from './App.module.css'
import BackgroundCircle from "./components/ui/backgroundCircle";
import WelcomePage from './components/pages/WelcomePage';
import ChooseJobBoard from './components/pages/ChooseJobBoard';
import SearchDetails from './components/pages/SearchDetails';
import CandidacyDetails from './components/pages/CandidacyDetails';
import NotFound from "./components/pages/NotFound";
import PotentialQuestions from "./components/pages/PotentialQuestions";
import LaunchCampaign from "./components/pages/LaunchCampaign";
import SpeedParams from "./components/pages/SpeedParams";


function App() {
  return (
    <div className={styles.main}>
      <div className={styles.primaryCircle}>
        <BackgroundCircle />
      </div>

      <Routes>
        <Route path="/Hello" element={<WelcomePage />} />
		    <Route path="/ChooseJobBoard" element={ <ChooseJobBoard/>} />
        <Route path="/SearchDetails" element={ <SearchDetails/>} />
        <Route path="/CandidacyDetails" element={ <CandidacyDetails/>} />
        <Route path="/PotentialQuestions" element={ <PotentialQuestions/>} />
        <Route path="/" element={ <SpeedParams/>} />

        <Route path="/2" element={ <LaunchCampaign/>} />
        <Route path="*" element={ <NotFound/>} />
      </Routes>

      <div className={styles.secondaryCircle}>
        <BackgroundCircle />
      </div>

    </div>
  );
}

export default App;
