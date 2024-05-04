import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CountDown from './CountDown'
import ExamPaper from './ExamPaper';
import db,{auth} from '../dbconfig';
import { UserContext } from '../App';
import Loading from '../Loading';
import { Box, Button, Typography, Modal } from '@material-ui/core';
import { doc, getDocs, collection, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function AttendExam(props) {
    const [submitted, setSubmitted] = useState(true)
    const [subject, setSubject] = useState('')
    const [hours, setHours] = useState(null)
    const [mins, setMins] = useState(null)
    // const [paper, setPaper] = useState(props.examPaper['CSES1BE'])
    // const [paper, setPaper] = useState([])
    const [shortAnswer, setShortAnswer] = useState([])
    const [longAnswer, setLongAnswer] = useState([])
    const [shorts, setShorts] = useState([])
    const [longs, setLongs] = useState([])
    const loggedInUser = useContext(UserContext);
    const calculateTimeLeft = () => {

        // console.log(subject=='')
        if (subject=='') return null
        let difference = props.examTime[subject].startTime.toDate() - new Date();
        let timeLeft = {};
        console.log(difference)
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft=-1
        }
    //   console.log(timeLeft)
      return timeLeft;
    }

    const stopUserLeaving = useCallback((e)=>{
      e.preventDefault();
    }, [])


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitPaper=()=>{
        // alert('working')
        if(submitted)
            return
        // db.collection('exam').doc(loggedInUser.currentUser.data.course).update(data)
        // alert('answers submitted  ')
        // setSubmitted(true)
        // return
        
        
        var shorts = JSON.parse(localStorage.getItem('shorts'))
        var longs = JSON.parse(localStorage.getItem('longs'))
        localStorage.removeItem('shorts');
        localStorage.removeItem('longs');

        const year = 'Y' + new Date().getFullYear()

        getDoc(doc(db, "answers", loggedInUser.currentUser.data.course))
        .then((d)=>{
          let data = d.data()
          if(!d.exists() || !data.hasOwnProperty(loggedInUser.currentUser.data.sem)){
            data={}
            data[loggedInUser.currentUser.data.sem]={}
            data[loggedInUser.currentUser.data.sem][year]={}
            data[loggedInUser.currentUser.data.sem][year][subject]={}
            
            data[loggedInUser.currentUser.data.sem][year][subject][auth.currentUser.uid] = {
              stref: doc(db, "users", auth.currentUser.uid),//db.collection('users').doc(auth.currentUser.uid),
              ans:{
                short:shorts,
                long: longs
              },
              complete:false
            }  
          } else if (!data[loggedInUser.currentUser.data.sem].hasOwnProperty(year)) {
            data[loggedInUser.currentUser.data.sem][year]={}
            data[loggedInUser.currentUser.data.sem][year][subject]={}
            data[loggedInUser.currentUser.data.sem][year][subject][auth.currentUser.uid] = {
              stref:doc(db, "users", auth.currentUser.uid),
              ans:{
                short:shorts,
                long: longs
              },
              complete:false
            }
          } else if (!data[loggedInUser.currentUser.data.sem][year].hasOwnProperty(subject)) {
            data[loggedInUser.currentUser.data.sem][year][subject]={}
            data[loggedInUser.currentUser.data.sem][year][subject][auth.currentUser.uid] = {
              stref: doc(db, "users", auth.currentUser.uid),
              ans:{
                short:shorts,
                long: longs
              },
              complete:false
            }
          } else {
            data[loggedInUser.currentUser.data.sem][year][subject][auth.currentUser.uid] = {
              stref: doc(db, "users", auth.currentUser.uid),
              ans:{
                short:shorts,
                long: longs
              },
              complete:false
            }
          }
          // console.log(data) 
          setSubmitted(true)
          if(!d.exists())
            // db.collection('answers').doc(loggedInUser.currentUser.data.course).set(data)
            setDoc(doc(db, "answers", loggedInUser.currentUser.data.course), data)
          else
            updateDoc(doc(db, "answers", loggedInUser.currentUser.data.course), data)
            // //setting exam data in examiner's document
            // db.collection('questions').doc(loggedInUser.currentUser.data.course).get()
            // .then((doc)=>{
            //   let d = doc.data()[year][loggedInUser.currentUser.data.sem][subject]['examiners']
            //   let data={}
            //   data['checkpaper'+new Date().getFullYear()]={
            //     course:loggedInUser.currentUser.data.course,
            //     subject:subject,
            //     semester:loggedInUser.currentUser.data.sem
            //   }
            //   d.forEach((examiner)=>{
            //     examiner.get().then((doc)=>{
            //       if(doc.data()['checkpaper'+new Date().getFullYear()].filter((ele)=>ele.subject!=subject && ele.semester!=loggedInUser.currentUser.data.sem).length()!=0){
            //         examiner.update(data)
            //       }
            //     })                 
            //   })
            // })   
        }).catch((error)=>{
          console.log(error)
        })

        getDoc(doc(db, "exam", loggedInUser.currentUser.data.course))
        .then((d)=>{
          let data=d.data()
          if(data[loggedInUser.currentUser.data.sem][year][subject]) {
            data[loggedInUser.currentUser.data.sem][year][subject]["completed"] = true
          }
          updateDoc(doc(db, "exam", loggedInUser.currentUser.data.course), {...data})
          .then(()=>{
            window.removeEventListener('beforeunload', stopUserLeaving);
            window.location.reload(true)
          })
        })
    }

    useEffect(()=>{
      
        
        // console.log(db.collection('users').doc(loggedInUser.currentUser.uid))
        // console.log(props.examTime['New_Subject_Code0'].startTime.toDate())
        console.log(props.examTime)
        if(!!props.examTime){

          const today= new Date()
          //console.log(props.examTime)
          // console.log(props.examTime['CSES1BE'].startTime.toDate().toLocaleDateString() == new Date().toLocaleDateString())
          // const sub = Object.keys(props.examTime).filter((key)=>props.examTime[key]['completed']==false && props.examTime[key].startTime.toDate().toLocaleDateString() == today.toLocaleDateString())
          const found = Object.keys(props.examTime).find((key) => props.examTime[key]['completed']==false && today.getTime() < props.examTime[key].endTime.toDate().getTime() && props.examTime[key].startTime.toDate().toLocaleDateString() == today.toLocaleDateString())
          console.log(found)
          if(!found) {
            return
          }
          
          const sub = Object.keys(props.examTime).filter((key)=>props.examTime[key]['completed']==false && today.getTime() < props.examTime[key].endTime.toDate().getTime() && props.examTime[key].startTime.toDate().toLocaleDateString() == today.toLocaleDateString())
          console.log(sub)
          
          
          if(sub.length!==0) {
            // console.log(sub)
            // if answers submitted or not
            var done=[];
            // db.collection("answers").doc(loggedInUser.currentUser.data.course).get()
            getDoc(doc(db, "answers", loggedInUser.currentUser.data.course))
            .then((d)=>{
              console.log(d.exists() ,d.data())
              if(d.exists() 
                && Object.keys(d.data()).length!=0
                && d.data().hasOwnProperty(loggedInUser.currentUser.data.sem)
                && d.data().hasOwnProperty([loggedInUser.currentUser.data.sem]["Y"+today.getFullYear()])
                && d.data().hasOwnProperty([loggedInUser.currentUser.data.sem]["Y"+today.getFullYear()][sub[0]])
                )
              // console.log(Object.keys(d.data()[loggedInUser.currentUser.data.sem]["Y"+today.getFullYear()][sub[0]]).filter((id)=>loggedInUser.currentUser.uid == id))
                done = Object.keys(d.data()[loggedInUser.currentUser.data.sem]["Y"+today.getFullYear()][sub[0]]).filter((id)=>loggedInUser.currentUser.uid == id )
            })
            .then(()=>{
                //console.log(done)
                if(done.length == 0){
                  setSubject(sub[0])
                  setSubmitted(false)
                  //console.log(props.examTime[sub[0]])
                  setHours(parseInt(props.examTime[sub[0]]['durationH']))
                  setMins(parseInt(props.examTime[sub[0]]['durationM']))
                  // db.collection('questions').doc(loggedInUser.currentUser.data.course).get()
                  getDoc(doc(db, "questions", loggedInUser.currentUser.data.course))
                  .then((doc)=>{
                      // console.log(doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['paper']['short'].sort().map((i)=>doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['short'][i]))
                      // console.log(doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['paper']['long'].sort().map((i)=>doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['long'][i]))
                      let s = doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['paper']['short'].sort().map((i)=>doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['short'][i])
                      if(localStorage.getItem('shorts')==null)
                          localStorage.setItem('shorts', JSON.stringify(s.map((e)=> ({ans:'', mark:''}))))
                      setShorts(s)
                      let l = doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['paper']['long'].sort().map((i)=>doc.data()['Y'+ today.getFullYear()][loggedInUser.currentUser.data.sem][sub[0]]['long'][i])
                      if(localStorage.getItem('longs')==null)
                          localStorage.setItem('longs', JSON.stringify(l.map((e)=> ({ans:'', mark:''}))))
                      setLongs(l)
                  })
                  .catch((error)=>{
                      console.log(error)
                  })
                }
                
            }) 
          }  
        }
        

        // console.log(paper)
        // const d = new Date()
        // const key =(d.getMonth()<10?('0'+d.getMonth()):d.getMonth() )+""+ (d.getDate()<10?('0'+d.getDate()):d.getDate())
        // // const key = '2004'
        // setKey(key)
        // // console.log(props.examTime.routine[key]!=null)
        // if(props.examTime.routine[key]!=null) {
        //     let end = props.examTime.routine[key][2].valueOf()
        //     let start = props.examTime.routine[key][0].valueOf()
        //     setHours(parseInt((end-start)/3600))
        //     setMins(parseInt(((end-start)%3600)/60))
        // }
        
        // console.log(calculateTimeLeft(key))
        // console.log(props.examTime.routine[key][0], props.examPaper[props.examTime.routine[key][1]].paper)
        
        
    },[])

    useMemo(()=>{
      if(!!timeLeft) {
        window.addEventListener('beforeunload', stopUserLeaving);
      } else {
        window.removeEventListener('beforeunload', stopUserLeaving);
      }
    }, [timeLeft])
    
    useEffect(()=>{
      if(subject!='' && timeLeft!=-1)
        setTimeout(() => {setTimeLeft(calculateTimeLeft())}, 1000)

    },[subject, timeLeft])

    function detectTabChange(){
      window.onfocus = function (ev) {
        console.log("gained focus");
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    

    const triggerModal = () => {
      <>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </>
    }
    
    window.onblur = function (ev) {
        // alert("TAB CHANGE DETECT")
        handleOpen()
        console.log("lost focus");
    };
    }
  
    // Object.keys(props.examTime.routine).sort()
    return (
        // <div>       
        // {   
        //     key!=='' ?
        //         props.examTime.routine[key] == null
        //         ?
        //             <div>
        //                 You don't have exam today
        //             </div>
        //         : (
        //             // console.log(new Date(props.examTime.routine[key][2]. props.examTime.routine[key][0].toMillis ()).getHours())
        //         //    console.log(hours,":",mins)
        //             <CountDown date={new Date(props.examTime.routine[key][0].toDate())}/>
        //         )
        //     : <p></p>
        // }    
        // </div>
        <div>
            {<>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Note: A tab change is detected
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              3 such attempts will lead to closure of the examination
            </Typography>
          </Box>
        </Modal>
      </>}
            {
                subject == ''
                ? <div> 
                    No Exam now
                    {detectTabChange()}
                    {/* Exam will start in
                     */}
                  </div>
                :<div>
                    {
                        // timeLeft!=null?
                        // console.log(timeLeft)
                        // :'no'

                    }
                    {
                        // console.log(timeLeft, Object.keys(timeLeft).length)
                        timeLeft!=null?

                         Object.keys(timeLeft).length != 0 
                            ? <div>
                                'Exam will start in'
                                <div>{timeLeft.hours<10?('0'+timeLeft.hours):timeLeft.hours}:{timeLeft.minutes<10?('0'+timeLeft.minutes):timeLeft.minutes}:{timeLeft.seconds<10?('0'+timeLeft.seconds):timeLeft.seconds} </div>
                            </div>
                        
                            : <div>
                                Time Left : <div>{!submitted?<CountDown date={props.examTime[subject].endTime.toDate()} submitPaper={submitPaper}/>:'None'}</div>
                                {
                                    submitted
                                    ? 'Exam is over'
                                    :<ExamPaper submitPaper={submitPaper} subject={subject} setShortAnswer={setShortAnswer} setLongAnswer={setLongAnswer} shortAnswer={shortAnswer} longAnswer={longAnswer} shorts={shorts} longs={longs} />       
                                }
                                
                            </div>
                        :<Loading />
                    }    
                </div>
                
            }
        </div>
    )
}
