import styles from "./NewAutopilot.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseClient";
import { useEffect, useContext, useState} from "react";
import { CampaignContext } from "../../App";



const NewAutopilot = () => {

  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {campaignDetails, setCampaignDetails, setProgressCount, autopilotCampaigns, setAutopilotCampaigns} = useContext(CampaignContext)

  const [newAutopilotCampaign, setNewAutopilotCampaign] = useState({
    percentage: null,
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
  
  useEffect(() => {
    setProgressCount(1)
  }, []);

  useEffect(() => {
    if (!user && !loading) {navigate('/EnterAccount')}
  }, [user, loading]);
  

  const handleConfirm = async () => {

      window.api.saveNewAutopilotlist(newAutopilotCampaign)


  }


  return (
    <> 

    {user &&
        <div className={styles.section} >
                
                <div className={styles.textPart}>

                  <div className={styles.titlePart}>
                    <div className={styles.backButton} onClick={()=> navigate('/Autopilot')}>
                        <img src="./assets/images/arrow.png" alt="back" />
                        <p>Back</p>
                    </div>
                    <h1>New Autopilot</h1>
                    <div className={styles.confirmButton} onClick={()=>handleConfirm()}>
                      <p>Add New</p>
                    </div>
                  </div>

                  <form className={styles.form1}>
                    <div className={styles.inputGroup}>
                        <p>Autopilot Details</p>
                      
                        <input type="text" placeholder="Platform" value={newAutopilotCampaign.platform} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, platform: e.target.value})}  />

                        <input type="text" placeholder="Hours" value={newAutopilotCampaign.percentage} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, percentage: e.target.value})}  />
                        
                        <input type="text" placeholder="Days" value={newAutopilotCampaign.percentage} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, percentage: e.target.value})}  />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <p>Search Details</p>

                        <input type="text" placeholder="Job Title" value={newAutopilotCampaign.jobTitle} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, jobTitle: e.target.value})}  />
                        
                        <input type="text" placeholder="Location" value={newAutopilotCampaign.location} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, location: e.target.value})}  />

                        <input type="text" placeholder="Remote" value={newAutopilotCampaign.remote} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, remote: e.target.value})}  />

                    </div>

                    <div className={styles.inputGroup}>
                        <p>Candidacy Details</p>
                        <input type="text" placeholder="Name" value={newAutopilotCampaign.name} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, name: e.target.value})}  />
                        
                        <input type="text" placeholder="Email" value={newAutopilotCampaign.email} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, email: e.target.value})}  />
                        
                        <input type="text" placeholder="Phone" value={newAutopilotCampaign.phone} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, phone: e.target.value})}  />
                      
                    </div>
                    <div className={styles.inputGroup}>
                        <p>Candidacy Files</p>
                      
                        <input type="text" placeholder="Resume Path" value={newAutopilotCampaign.resume.path} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, resume: {name: "file.name", size: "file.size", path: e.target.value} })}  />

                        <input type="text" placeholder="Cover Letter Path" value={newAutopilotCampaign.coverLetter} 
                          onChange={(e) => setNewAutopilotCampaign({...newAutopilotCampaign, coverLetter: e.target.value})}  />
                    </div>

                   
                  </form>
                </div>

        </div>
      }
    </>
  );
};

export default NewAutopilot;
