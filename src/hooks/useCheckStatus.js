import { useState, useEffect } from "react";

import {query, getDocs, collection, doc, getDoc, orderBy, limitToLast, where} from "firebase/firestore"
import { db } from "../firebase/firebaseClient";

export default function useCheckStatus (user, deps="") { 

    const [isUserPremium, setIsUserPremium] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false)


    const getAccountStatus = async (uid) => {
        
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef) ;
            const docExists = docSnap?.exists();
    
            
            if (docExists) {
                const docData = docSnap.data()
                const accountStatusDoc = docData.accountStatus
                if (accountStatusDoc == "basic") {
                    setIsUserPremium(false)

                }
                if (accountStatusDoc == "premium") {
                    setIsUserPremium(true)

                }
            }
        }
        catch (err) {
            console.error("Error account status")
        }
            
    }



    useEffect(()=>{
        if (user) {
            const runChecks = async () => {
                setCheckLoading(true)
                await getAccountStatus(user.uid);
                setCheckLoading(false)
            }

            runChecks();
        }
    }, [...deps])

    useEffect(()=> {
        if (checkLoading) {
            setTimeout(()=>{
                setCheckLoading(false)
            }, 20000)
        }
    })


  return [isUserPremium, checkLoading];
}