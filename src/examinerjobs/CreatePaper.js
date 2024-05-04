import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import ShortQuestions from "./ShortQuestions";
import LongQuestions from "./LongQuestions";
import FinalPaperSubmit from "./FinalPaperSubmit";
import SelectData from "./SelectData";
import ShowPapers from "./ShowPapers";
import db, { auth } from "../dbconfig";
import { doc, getDocs, collection, getDoc, updateDoc, arrayUnion, onSnapshot, query } from "firebase/firestore";
import { Snackbar } from "@material-ui/core";
import { UserContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CreatePaper() {
  const classes = useStyles();
  const loggedInUser = useContext(UserContext);
  const year = new Date().getFullYear();
  const [activeStep, setActiveStep] = useState(0);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [curCourseData, setCurCourseData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [sem, setSem] = useState(null);
  const [sems, setSems] = useState([]);
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [shortQ, setShortQ] = useState([
    { q: "", op1: "", op2: "", op3: "", op4: "" },
  ]);
  const [longQ, setLongQ] = useState([""]);
  const steps = [
    "Select Course, Semester and Subject",
    "Enter Multiple Choice Questions",
    "Enter Long Answer Questions",
    "Review and Submit",
  ];
  const [validSteps, setValidSteps] = useState([false, false, false, false]);
  const [showPapers, setShowPapers] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    getDocs(collection(db, "courses"))
    .then((d) => {
      d.docs.forEach((ele) => {
        console.log(ele.data());
        if (Object.keys(ele.data()).length != 0) {
          setCourses((ids) => [...ids, ele.id]);
          setCourseData((data) => [...data, ele]);
          // data[ele.id]={...ele.data()}
        }
      });
    });

    getDocs(collection(db, "questions"))
    .then((d) => {
      d.docs.forEach((ele) => {
        // console.log(ele.data())
        if (Object.keys(ele.data()).filter((key) => key == "keep").length == 0) {
          console.log(ele.data())
          setQuestionData((v) => [...v, ele]);
        }
      });
    });
  }, []);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <SelectData
            questionData={questionData}
            setSubject={setSubject}
            subject={subject}
            subjects={subjects}
            setSubjects={setSubjects}
            courses={courses}
            setCourses={setCourses}
            validSteps={validSteps}
            setValidSteps={setValidSteps}
            activeStep={activeStep}
            course={course}
            setCourse={setCourse}
            courseData={courseData}
            setCourseData={setCourseData}
            curCourseData={curCourseData}
            setCurCourseData={setCurCourseData}
            sem={sem}
            setSem={setSem}
            sems={sems}
            setSems={setSems}
          />
        );
      case 1:
        return (
          <ShortQuestions
            shortQ={shortQ}
            setShortQ={setShortQ}
            validSteps={validSteps}
            setValidSteps={setValidSteps}
            activeStep={activeStep}
          />
        );
      case 2:
        return (
          <LongQuestions
            setLongQ={setLongQ}
            longQ={longQ}
            validSteps={validSteps}
            setValidSteps={setValidSteps}
            activeStep={activeStep}
          />
        );
      case 3:
        return (
          <FinalPaperSubmit
            course={course}
            subject={subject}
            longQ={longQ}
            shortQ={shortQ}
            year={year}
            sem={sem}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = () => {
    // console.log(shorts)
    if (activeStep === validSteps.length - 1) {
      // db.collection("questions").doc(course).get()
      getDoc(doc(db, "questions", course))
        .then((d) => {
          let data = d.data();
          if (!data.hasOwnProperty("Y" + year)) {
            data["Y" + year] = {};
            data["Y" + year][sem] = {};
            data["Y" + year][sem][subject] = {
              published: false,
              examiners: [doc(db, "users", auth.currentUser.uid)],
            };
            data["Y" + year][sem][subject]["long"] = longQ;
            data["Y" + year][sem][subject]["short"] = shortQ;
          } else if (!data["Y" + year].hasOwnProperty(sem)) {
            data["Y" + year][sem] = {};
            data["Y" + year][sem][subject] = {
              published: false,
              examiners: [doc(db, "users", auth.currentUser.uid)],
            };
            data["Y" + year][sem][subject]["long"] = longQ;
            data["Y" + year][sem][subject]["short"] = shortQ;
          } else if (!data["Y" + year][sem].hasOwnProperty(subject)) {
            data["Y" + year][sem][subject] = {
              published: false,
              examiners: [doc(db, "users", auth.currentUser.uid)],
            };
            data["Y" + year][sem][subject]["long"] = longQ;
            data["Y" + year][sem][subject]["short"] = shortQ;
          } else {
            data["Y" + year][sem][subject]["examiners"] = [
              ...data["Y" + year][sem][subject]["examiners"],
              doc(db, "users", auth.currentUser.uid),
            ];
            data["Y" + year][sem][subject]["long"] = [
              ...data["Y" + year][sem][subject]["long"],
              ...longQ,
            ];
            data["Y" + year][sem][subject]["short"] = [
              ...data["Y" + year][sem][subject]["short"],
              ...shortQ,
            ];
          }
          console.log(data);

          updateDoc(doc(db, "questions", course), data)
            .then(() => {
              data = {};
              data["checkpaper" + new Date().getFullYear()] =
                // firebase.firestore.FieldValue.arrayUnion({
                //   course: course,
                //   subject: subject,
                //   semester: sem,
                // });
                arrayUnion({
                  course: course,
                  subject: subject,
                  semester: sem,
                });

              // db.collection("users").doc(loggedInUser.currentUser.uid).update(data);
              updateDoc(doc(db, "users", loggedInUser.currentUser.uid), data)
              setMsgOpen(true);
            });
          setValidSteps([false, false, false, false]);
          setActiveStep(0);
        });
      return;
    }

    if (validSteps[activeStep])
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    else {
      setSnackBarMessage("Please complete step " + (activeStep + 1));
      setSnackBarOpen(true);
    }
  };

  const handleBack = () => {
    // setValidSteps((array)=>{
    //   array[activeStep-1] = false;
    //   return array
    // })
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      {showPapers == false ? (
        <div>
          {/* <Button variant="contained" color="primary" onClick={()=>setShowPapers(true)}>Show Papers</Button> */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              ""
            ) : (
              <div>
                {/* <Typography component='div' className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  open={msgOpen}
                  onClose={() => setMsgOpen(false)}
                  message="Paper Submitted Successfully"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowPapers(false)}
          >
            back
          </Button>
          <ShowPapers courseData={courseData} />
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={() => setSnackBarOpen(false)}
            >
              CLOSE
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}
