import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import db from '../dbconfig';
import DisplaySubjects from './DisplaySubjects';
import { Button, Divider, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import Loading from '../Loading';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function SubjectJob() {
  const classes = useStyles();
  const year = new Date().getFullYear()
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('')
  const [sem, setSem] = useState('')
  const [currentSem, setCurrentSem] = useState(0)
  const [reload, setReload] = useState(1)
  const [courseData, setCourseData] = useState({})
  const [currentCourseData, setCurrentCourseData] = useState(null)
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  
  useEffect(()=>{

    // db.collection('courses').get()
    getDocs(collection(db, "courses"))
    .then((d)=>{
    // db.collection('courses').onSnapshot((d)=>{
      // console.log(d.docs)
      // setCourses(d.docs.map(ele=>ele.id))
      // let data={}
      // d.docs.forEach((ele)=> data[ele.id]={...ele.data()})
      // setCourseData(data)
      // setCurrentSem(0)
      // setCourse(d.docs[0].id)
      let data={}
      d.docs.forEach((ele)=>{
        if(Object.keys(ele.data()).length!=0){
          // console.log(ele.data())
          data[ele.id]={...ele.data()}
        }
      })
      console.log(data)
      setCourses(Object.keys(data))
      setCourseData(data)
      setCurrentSem(0)
      setCourse(Object.keys(data)[0])
    })
    // var c=[]
    // db.collection('courses').get().then((d)=>{
    //   d.docs.forEach((ele)=>{
    //     c.push(ele.id)
    //   })
    //   setCourses(c)
    //   setCourse(c[0])
    // handleChange(course)
    // })
    // setReload(true)
    
    
    // handleChange(props.courses[0])
  },[])

  const handleChange = (value) => {
    setCourse(value);
  }

  const addCourse=()=>{
    let data={}

    if(courses.indexOf(newCourse)==-1) {
      setDoc(doc(db, "courses", newCourse), {
        'S1': {}
      })      
      .then(()=>{
        data={}
        data['Y'+year]={
          'S1':{
          }
        }
        // db.collection('questions').doc(newCourse).set({})
        setDoc(doc(db, "questions", newCourse), {}) 
        .then(()=>{
          data={}
          data[newCourse]={
            'S1':{}
          }
          console.log({...courseData, ...data})
          setCourses((v)=>[...v, newCourse])
          setCourseData((arr)=>({...arr, ...data}))
          setCourse(newCourse)
          setSnackBarMessage('Course Added')
          setSnackBarOpen(true)
          setNewCourse('')
        })
      }).then(()=>{
        // setReload((d)=>d+1)
      })
      
    } else {
      setSnackBarMessage('Already There')
      setSnackBarOpen(true)
    }   
  }

  return(
    <div>
      <Paper component="div" elevation="2" className="elevated_container">
      <Typography variant="h5">
        Add a new Course
      </Typography>
      <Divider className="border"/>
      <div style={{display:'flex', flexFlow:'row', justifyContent: 'center'}}>
        <TextField id="newCourse" label="Add New Course" value={newCourse} fullWidth onChange={(e)=>setNewCourse(e.target.value)} style={{width:'80%', marginRight: '2%'}}/>
        <Button variant="outlined" color="primary" onClick={()=>addCourse()}>Add Course</Button>
      </div>
      </Paper>
      <Paper component="div" elevation="2" className="elevated_container">
      <Typography variant="h5">
        Course Details
      </Typography>
      <Divider className="border"/>
      {
        courses.length!=0 && course!=undefined && course!=''
        ? <div>
            <FormControl variant="filled" className={classes.formControl} fullWidth disabled={courses.length==0?true:false}>
              <InputLabel id="select-filled-label">Select Course</InputLabel>
              <Select
                labelId="select-filled-label"
                id="select-filled"
                value={course}
                onChange={(e)=>handleChange(e.target.value)}    
              >
                {
                  courses.map((ele)=><MenuItem key={ele} value={ele}>{ele}</MenuItem>)
                }
              </Select>
            </FormControl>
            <div>
            {
              //  course!='' ?(<DisplaySubjects semester={sem} course={course} add={addSubject} removeSem={removeSem} addSem={addSem} reload={reload} setReload={setReload} currentSem={currentSem} currentCourseData={currentCourseData}/>):('')
              // course!=undefined && course!='' && Object.keys(courseData).length!=0
              Object.keys(courseData).length!=0
              ? <DisplaySubjects course={course} courseData={courseData} setCourseData={setCourseData} setCourse={setCourse} /> 
              : <Loading />
            }  
            </div> 
          </div>
        : <Typography align='center' paragraph={true} component='p' variant='h5' style={{margin:'20px'}}>
            Add a new course to see course details here
          </Typography> 
      }
      </Paper>
      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={()=>setSnackBarOpen(false)}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={()=>setSnackBarOpen(false)}>
              CLOSE
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}
