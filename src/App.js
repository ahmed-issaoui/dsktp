
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from './App.module.css'

import { logout } from "./firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from './firebase/firebaseClient'


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



function App() {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);


  return (
    <div className={styles.main}>
      <div className={styles.primaryCircle}>
        <BackgroundCircle />
      </div>

      <div className={styles.content}>

        <img src="../assets/images/logo-easyjob.svg" alt="logo easyjob" className={styles.imgLogo} onClick={()=> navigate("/")}/>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/EnterAccount" element={<EnterAccount />} />
          <Route path="/ChooseJobBoard" element={ <ChooseJobBoard/>} />
          <Route path="/SearchDetails" element={ <SearchDetails/>} />
          <Route path="/CandidacyDetails" element={ <CandidacyDetails/>} />
          <Route path="/PotentialQuestions" element={ <PotentialQuestions/>} />
          <Route path="/SpeedParams" element={ <SpeedParams/>} />
          <Route path="/Summary" element={ <Summary/>} />

          <Route path="/Parameters" element={ <Parameters/>} />
          <Route path="*" element={ <NotFound/>} />
        </Routes>

        <div className={styles.navIcons}>
          <img src="../assets/images/icon-profile.png" alt="profile icon" className={styles.navIcon} onClick={()=> navigate("/Parameters")}/>
          <img src="../assets/images/icon-support.png" alt="support icon" className={styles.navIcon}/>
          <img src="../assets/images/icon-notifications.png" alt="notifications icon" className={styles.navIcon}/>
          {user && <button onClick={logout}>Logout</button>}


        </div>
      </div>

      <div className={styles.secondaryCircle}>
        <BackgroundCircle />
      </div>

    </div>
  );
}

export default App;
