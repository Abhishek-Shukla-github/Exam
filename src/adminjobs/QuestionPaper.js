import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShortQuestions from './ShortQuestions';
import LongQuestions from './LongQuestions';
import FinalPaperSubmit from './FinalPaperSubmit';
import SelectData from './SelectData';
import db from '../dbconfig';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function QuestionPaper(props) {
  const classes = useStyles();
  const year = new Date().getFullYear()
  const [activeStep, setActiveStep] = useState(0);
  const [course, setCourse] = useState(null)
  const [curCourseData, setCurCourseData]=useState([])
  const [data, setData] = useState([])
  const [sem, setSem] = useState(null)
  const [sems, setSems] = useState([])
  const [subject, setSubject] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [shorts, setShorts] = useState([])
  const [shortChecked, setShortChecked] = useState([]);
  const [longs, setLongs] = useState([])
  const [longChecked, setLongChecked] = useState([]);
  const steps = ['Select Year, Course and Subject', 'Select Multiple Choice Question', 'Select Long Answer Question', 'Review and Submit'];
  const [validSteps, setValidSteps] = useState([false, false, false, false])
  const [successOpen, setSuccessOpen] = useState(false);
  
  useEffect(()=>{
    getDocs(collection(db, "courses"))
    .then((d)=>{
      d.docs.forEach((ele)=>{
        if(Object.keys(ele.data()).length!=0){
          setData((data)=>[...data, ele])
        }
      })    
    })
  },[])

  const getStepContent=(stepIndex)=>{
    switch (stepIndex) {
      case 0:
        return <SelectData data={data} setSubject={setSubject} curCourseData={curCourseData} setCurCourseData={setCurCourseData} subject={subject} subjects={subjects} setSubjects={setSubjects} courses={props.courses} validSteps={validSteps} setValidSteps={setValidSteps} activeStep={activeStep} course={course} setCourse={setCourse} courseData={props.courseData} sem={sem} setSem={setSem} sems={sems} setSems={setSems} />;
      case 1:
        return <ShortQuestions shortChecked={shortChecked} setShortChecked={setShortChecked} setShorts={setShorts} curCourseData={curCourseData} subject={subject} courses={props.courses} validSteps={validSteps} setValidSteps={setValidSteps} activeStep={activeStep} course={course} courseData={props.courseData} setCourseData={props.setCourseData} sem={sem}/>;
      case 2:
        return <LongQuestions longChecked={longChecked} setLongChecked={setLongChecked} setLongs={setLongs} curCourseData={curCourseData} subject={subject} courses={props.courses} validSteps={validSteps} setValidSteps={setValidSteps} activeStep={activeStep} course={course} courseData={props.courseData} setCourseData={props.setCourseData} sem={sem}/>;
      case 3:
        return <FinalPaperSubmit course={course} subject={subject} longs={longs} shorts={shorts} year={year} sem={sem} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleNext = () => {
    if(activeStep === validSteps.length-1) {
      let data = {}
      data['Y'+year] = {...curCourseData}
      data['Y'+year][sem][subject] = {
        ...curCourseData[sem][subject],
        prepared:true,
        paper : {
          long : longChecked,
          short : shortChecked
        }
      } 

      // console.log(course)      
      updateDoc(doc(db, 'questions', course), data)
      .then(()=>{
        setSuccessOpen(true);
      })

      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      return
    }
     
    if(validSteps[activeStep])
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    else
      console.log("Please complete step " + (activeStep+1))
  };

  const handleBack = () => {
    // setValidSteps((array)=>{
    //   array[activeStep-1] = false;
    //   return array
    // })
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setValidSteps([false, false, false, false]);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
  };
  return (
    <div className={classes.root}>
      <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
          {activeStep === steps.length ? <Typography className={classes.instructions} component="div">{getStepContent(steps.length-1)}</Typography> : (
            <div>
              <Typography className={classes.instructions} component="div">{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
              <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                  Paper submitted successfully
                </Alert>
              </Snackbar>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}