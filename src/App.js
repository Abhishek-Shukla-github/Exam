import React, {useState, createContext, useReducer, useEffect } from 'react';
import Admin from './Admin';
import Student from './Student';
import Examiner from './Examiner';
import SignInSide from './SignInSide';
import db, { auth } from './dbconfig';
import VeryMsg from './VerifyMsg';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core';
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { signOut, sendEmailVerification } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



export const UserContext = createContext()

const reducer=(state, action)=>{
  switch(action.type){
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default function App(){
    const [user, dispatch] = useReducer(reducer, null)
    const [content, setContent] = useState(null)
   
    const classes = useStyles();
    const select=(choice)=>{
      switch(choice){
        case 'Administrator': return <Admin setContent={setContent}/>; 
        case 'Student': return <Student setContent={setContent}/>; 
        case 'Examiner': return <Examiner setContent={setContent}/>;
        case 'signin': return <SignInSide />;
      }
    }

    useEffect(()=>{
      if (document.visibilityState == "visible") {
        console.log("tab is active")
      } else {
        console.log("tab is inactive")
      }
      // setContent(null)

      auth.onAuthStateChanged(function(cu) {
        if (cu) {
            // User is signed in.
            // getDoc(doc(db, "users", cu.uid))
            // .then((doc)=>{      
            //   dispatch({
            //     type:"LOGIN",
            //     data: {...cu,  data:doc.data()}     
            //   }) 
            //   setContent(select(doc.data().usertype))         
            // }).catch((error)=>{
            //   console.log(error)
            //   // sendEmailVerification(auth.currentUser)
            //   signOut(auth).then(()=>{
            //     dispatch({
            //       type:"LOGOUT",
            //       data: null  
            //     })
            //     setContent(select('signin'))
            //   })
              
            //   // complete sign up
            // })
            console.log(cu)
          if(cu.emailVerified) {
            
            // User is signed in.
            // db.collection('users').doc(cu.uid).get()
            getDoc(doc(db, "users", cu.uid))
            .then((doc)=>{         
                dispatch({
                  type:"LOGIN",
                  data: {...cu,  data:doc.data()}     
                }) 
                setContent(select(doc.data().usertype))         
            }).catch((error)=>{
              console.log(error)
              // complete sign up
            })
          } else {
            setContent(<VeryMsg setContent={setContent}/>)
          }
        } else {
          dispatch({
            type:"LOGOUT",
            data: null  
          })
          setContent(select('signin'))
        }
      });
    },[])
    
    // console.log(user)
    return (
        <UserContext.Provider value={{currentUser:user, action:dispatch}}>
        {   
        
          content===null 
          // ? <Backdrop className={classes.backdrop} open={true} >
          //     <CircularProgress color="inherit" />
          //   </Backdrop>
          ? <Loading />
          : content
        }
        </UserContext.Provider>
    );
}