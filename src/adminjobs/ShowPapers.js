import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import firebase from 'firebase/compat/app';
import db from '../dbconfig';
import { doc,addDoc, updateDoc, setDoc, getDoc,collection, Timestamp } from "firebase/firestore";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Row(props) {
  // const { row } = props;
  console.log(props)
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [published, setPublished]=useState(props.published)
  const setValues=()=>{
      props.setDialogOpen(true)
      props.setValues(()=>({
        course:props.course,
        year:props.year,
        sem:props.sem,
        sub:props.sub
      }))
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {props.year}
        </TableCell>
        <TableCell align="center">{props.course}</TableCell>
        <TableCell align="center">{props.sem}</TableCell>
        <TableCell align="center">{props.published?'Yes':'No'}</TableCell>
        <TableCell align="center">{props.sub}</TableCell>
        <TableCell align="center"> 
         {
           published==true
           ? 'Published'
           : <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<PublishIcon />}
              onClick={setValues}
            >
              Publish
            </Button>
         }
          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {props.sub}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Short Questions
              </Typography>
              {
                 props.allData[props.course][props.year][props.sem][props.sub]['paper']['short'].map((index)=><div className="preview_questions" key={index}><span>{index+1+" )"}</span>{props.allData[props.course][props.year][props.sem][props.sub]['short'][index].q}</div>)
                // console.log(props.allData[props.course][props.year][props.sem][props.sub]['paper']['short'])
              }
              <Typography variant="h6" gutterBottom component="div">
                Long Questions
              </Typography>
              {
                props.allData[props.course][props.year][props.sem][props.sub]['paper']['long'].map((index)=><div className="preview_questions" key={index}><span>{index+1+" )"}</span>{props.allData[props.course][props.year][props.sem][props.sub]['long'][index]}</div>)
              }
            
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}

export default function ShowPapers(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState(new Date());
  const [addHour, setAddHour] = useState(0);
  const [addMinute, setAddMinute] = useState(0);
  const [allData, setAllData] = useState({})
  const [dateTimeError, setDateTimeError] = useState(false)
  const [durationError, setDurationError] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false);
  const [values, setValues] = useState({
    course:'',
    year:'', 
    sem:'', 
    sub:''
  })
  

  const handleAddHour=(value)=>{
    if(value >= 0 && value <= 23)
      setAddHour(value)
  }

  const handleAddMinute=(value)=>{
    if(value >= 0 && value <= 59) 
      setAddMinute(value)
  }

  const publish=()=>{
    
    const start = new Date((selectedDate.getMonth()+1)+"/"+selectedDate.getDate()+"/"+selectedDate.getFullYear()+" "+selectedTime.getHours()+":"+selectedTime.getMinutes());
    let valid=true
    if(start <= new Date()){
      setDateTimeError(true)
      valid=false
    } else {
      setDateTimeError(false)
    }

    if(addHour==0 && addMinute==0){
      setDurationError(true)
      valid = false
    } else {
      setDurationError(false)
    }

    if(!valid)
      return

    let m = parseInt(addMinute) + parseInt(selectedTime.getMinutes());
    let h = parseInt(addHour) + parseInt(selectedTime.getHours()) + parseInt(m/60);
    m=m%60;
    
    const end = new Date((selectedDate.getMonth()+1)+"/"+selectedDate.getDate()+"/"+selectedDate.getFullYear()+" "+h+":"+m)

    getDoc(doc(db, "exam", values.course))
    .then((result) => {
      getDoc(props.courseData.find((course)=>course.id == values.course).ref)
      .then((d)=>{
        let data = d.data()
        data[values.year][values.sem][values.sub]['published'] = true
        setDoc(props.courseData.find((course)=>course.id == values.course).ref, data)
        data={}
        data[`${values.year}.${values.sem}.${values.sub}.published`] = true
        updateDoc(doc(db, "questions", values.course), data)
      })

      let data={}
      if(!result.exists()) {
        data[values.sem]={}
        data[values.sem][values.year]={}
        data[values.sem][values.year][values.sub]={
          startTime: Timestamp.fromDate(start),
          durationH:addHour,
          durationM:addMinute,
          endTime: Timestamp.fromDate(end),
          completed:false
        }
        setDoc(doc(db, "exam", values.course), data)
      } else {
        data = result.data()
        if(! data.hasOwnProperty(values.sem)){
          data[values.sem]={}
          data[values.sem][values.year]={}
          data[values.sem][values.year][values.sub]={
            startTime: Timestamp.fromDate(start),
            durationH:addHour,
            durationM:addMinute,
            endTime: Timestamp.fromDate(end),
            completed:false
          }
        } else if (! data[values.sem].hasOwnProperty(values.year)) {
          data[values.sem][values.year]={completed:false}
          data[values.sem][values.year][values.sub]={
            startTime: Timestamp.fromDate(start),
            durationH:addHour,
            durationM:addMinute,
            endTime: Timestamp.fromDate(end),
            completed:false
          }
        } else if (! data[values.sem][values.year].hasOwnProperty(values.sub)) {
          let d = {}
          d[values.sub]={
            startTime: Timestamp.fromDate(start),
            durationH:addHour,
            durationM:addMinute,
            endTime: Timestamp.fromDate(end),
            completed:false
          }
          data[values.sem][values.year] = {...data[values.sem][values.year], ...d}   
        }
        updateDoc(doc(db, "exam", values.course), data)
      }

      setSuccessOpen(true)
    })

    addDoc(collection(db, "notifications"), {
      created:Timestamp.fromDate(new Date()),
      expiry: Timestamp.fromDate(start),
      msg: 'Exam time table has been updated. Exam on the subject '+values.sub+' will be held on '+start,
      seen: false,
      user: 'Student'
    });
    setDialogOpen(false);
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
  };

  useEffect(() => {
    let d = {}
    props.courseData.forEach((ele1)=>{
      if(Object.keys(ele1.data()).length){
        // console.log(ele1)
        d[''+ele1.id] = {}
        Object.keys(ele1.data()).forEach((ele2)=>{
          d[''+ele1.id][ele2]={}
          Object.keys(ele1.data()[ele2]).forEach((ele3)=>{
            d[''+ele1.id][ele2][ele3]={}
            // console.log(ele1.id, ele2, ele3)
            Object.keys(ele1.data()[ele2][ele3]).forEach((ele4)=>{
              if(ele1.data()[ele2][ele3][ele4].prepared==true)
              d[''+ele1.id][ele2][ele3][ele4]=ele1.data()[ele2][ele3][ele4]
              // console.log(ele1.id, ele2, ele3, ele4, ele1.data()[ele2][ele3][ele4])
            })
          })
        })
      }
    })
    setAllData(d)
  },[])
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Course</TableCell>
              <TableCell align="center">Semester</TableCell>
              <TableCell align="center">Published</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // console.log(allData)
              Object.keys(allData).map((course) => {
                  // console.log(course)
                  return (
                    Object.keys(allData[course]).map((year)=>{
                      return (
                        Object.keys(allData[course][year]).map((sem)=>{
                          return (
                            Object.keys(allData[course][year][sem]).map((sub)=>{
                              // console.log(allData[course][year][sem][sub])
                              return <Row key={course+year+sem+sub}  course={course} sub={sub} year={year} sem={sem} published={allData[course][year][sem][sub]['published']} allData={allData} setDialogOpen={setDialogOpen} setValues={setValues}/>
                            })
                          )
                        })
                      )
                    })
                  )
                  // <Row key={row.name} row={row} />
              })   
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Date and Time</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select Date and Time for the selected exam to be held
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Typography paragraph={true} variant='caption' component='p' color='error' style={{display:dateTimeError?'block':'none',}}>
                  Please enter a future date &amp; time
              </Typography>
            <Grid container 
              // justify="space-evenly"
              alignItems="center"
              direction="row"
              spacing={3}
            >   
              <Grid item >
                <KeyboardDatePicker
                  label="Enter Date"
                  clearable
                  value={selectedDate}
                  placeholder="DD/MM/YYYY"
                  onChange={date => handleDateChange(date)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                  required
                />
              </Grid>
              <Grid item >
                <KeyboardTimePicker
                  label="Enter Time"
                  placeholder="HH:MM AM/PM"
                  mask="__:__ _M"
                  value={selectedTime}
                  onChange={time => handleTimeChange(time)}
                  required
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <DialogContentText style={{marginTop:'20px'}}>
            Enter duration
          </DialogContentText>
          <Typography paragraph={true} variant='caption' component='p' color='error' style={{display:durationError?'block':'none',}}>
              Time duration cannot be zero
          </Typography>
          <Grid container 
              // justify="center"
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Grid item >
                <TextField
                  id="filled-number"
                  label="Hour"
                  placeholder="Hour"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                  value={addHour}
                  onChange={(e)=>handleAddHour(e.target.value)}
                />
              </Grid>
              <Grid item >
                <TextField
                  id="filled-number"
                  label="Minute"
                  placeholder="Minute"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                  value={addMinute}
                  onChange={(e)=>handleAddMinute(e.target.value)}
                />
              </Grid>
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={publish} color="primary">
            Publish
          </Button>         
        </DialogActions>
      </Dialog>     
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Paper published successfully
        </Alert>
      </Snackbar>
    </div>
    // console.log(allData)
    
  );
}
