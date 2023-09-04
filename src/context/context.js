import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import useCheckStatus from "../hooks/useCheckStatus";

export const GlobalContext = createContext(null);


function Context({ children }) {
    const [user, loading, error] = useAuthState(auth);
    const [isUserPremium, checkLoading] = useCheckStatus(user, [user, loading])
  
        
    const [progressCount, setProgressCount] = useState(1)


    const [campaignDetails, setCampaignDetails] = useState({
      platform: '',
      speed: 1,
      jobTitle: '',
      location: '',
      remote: 'All',
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

    const [autopilotCampaigns, setAutopilotCampaigns] = useState([])



    return (
     
      <GlobalContext.Provider value={{  campaignDetails, setCampaignDetails, progressCount, setProgressCount, autopilotCampaigns, setAutopilotCampaigns, user, loading, error, isUserPremium, checkLoading}}>
        {children}
      </GlobalContext.Provider>
    );
  }

export default Context

