
import { Routes, Route } from "react-router-dom";
import styles from './App.module.css'
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import BackgroundCircle from "./components/ui/backgroundCircle";

import WelcomePage from './components/pages/WelcomePage';
import ChooseJobBoard from './components/pages/ChooseJobBoard';
import SearchDetails from './components/pages/SearchDetails';
import CandidacyDetails from './components/pages/CandidacyDetails';
import PotentialQuestions from "./components/pages/PotentialQuestions";
import SpeedParams from "./components/pages/SpeedParams";
import Summary from "./components/pages/Summary";
import Parameters from "./components/pages/Parameters";
import NotFound from "./components/pages/NotFound";
import EnterAccount from "./components/pages/EnterAccount";
import UpgradeAccount from "./components/pages/UpgradeAccount";
import NavBar from "./components/ui/navBar";




export const CampaignContext = createContext(null)

function App() {

  
  let navigate = useNavigate();
  const [progressCount, setProgressCount] = useState(1)
  const [campaignDetails, setCampaignDetails] = useState({
    platform: '',
    speed: 1,
    jobTitle: '',
    location: '',
    remote: true,
    name: '',
    phone: '',
    email: '',
    resume: {
      name: '',
      size: null,
      path: ''
    },
    coverLetter: '',
    questions: {
      allowedToWork: '',
      visaSponsorship: '',
      skills: '',
      experience: '',
      salary: '',
      veteran: '',
      startDate: '',
      currentLocation: '',
      ethnicity: ''
    }
  })


  return (
    <CampaignContext.Provider value={{campaignDetails, setCampaignDetails, progressCount, setProgressCount}}>
        <div className={styles.main}>
          <div className={styles.primaryCircle}>
            <BackgroundCircle />
          </div>

          <div className={styles.content}>

            <img draggable='false' src="../assets/images/logo-easyjob.svg" 
                alt="logo easyjob" className={styles.imgLogo} 
                onClick={()=> navigate("/ChooseJobBoard")}
            />

            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/EnterAccount" element={<EnterAccount />} />
              <Route path="/ChooseJobBoard" element={ <ChooseJobBoard/>} />
              <Route path="/SearchDetails" element={ <SearchDetails/>} />
              <Route path="/CandidacyDetails" element={ <CandidacyDetails/>} />
              <Route path="/PotentialQuestions" element={ <PotentialQuestions/>} />
              <Route path="/SpeedParams" element={ <SpeedParams/>} />
              <Route path="/Summary" element={ <Summary/>} />

              <Route path="/UpgradeAccount" element={ <UpgradeAccount/>} />
              <Route path="/Parameters" element={ <Parameters/>} />
              <Route path="*" element={ <NotFound/>} />
            </Routes>

            <div className={styles.navBar}>
              <NavBar/>
            </div>
          </div>

          <div className={styles.secondaryCircle}>
            <BackgroundCircle />
          </div>

        </div>
    </CampaignContext.Provider>
  );
}

export default App;
