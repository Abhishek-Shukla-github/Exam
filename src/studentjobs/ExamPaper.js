import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ShortQuestions from '../studentjobs/ShortQuestions';
import LongQuestions from '../studentjobs/LongQuestions';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import db,{auth} from '../dbconfig'
import { UserContext } from '../App';
import CountDown from './CountDown';
import { usePageVisibility } from '../hooks';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  paper: {
    width: '60%',
    maxHeight: 435,
  },
}));


function ConfirmationDialogRaw(props) {
  const { onClose, open, sub, ...other } = props;
  const user = useContext(UserContext);
  // useEffect(() => {
  //   if (!open) {
  //     props.setConfirm()
  //   }
  // }, [open]);
  // useEffect(()=>{
  //   props.setConfirm(false)  
  // },[])

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    // props.setConfirm(true)
    props.submitpaper();
    onClose();
  };

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  // const submitPaper=()=>{
  //   var shorts = JSON.parse(localStorage.getItem('shorts'))
  //   var longs = JSON.parse(localStorage.getItem('longs'))
  //   localStorage.removeItem('shorts');
  //   localStorage.removeItem('longs');
  //   // console.log(user.currentUser)
  //   const year = 'Y' + new Date().getFullYear()
  //   db.collection('answers').doc(user.currentUser.data.course).get().then((d)=>{
  //     let data = d.data()
  //     console.log(d.exists)
  //     if(!d.exists || ! data.hasOwnProperty(user.currentUser.data.sem)){
  //       data={}
  //       data[user.currentUser.data.sem]={}
  //       data[user.currentUser.data.sem][year]={}
  //       data[user.currentUser.data.sem][year][sub]={}
  //       data[user.currentUser.data.sem][year][sub][auth.currentUser.uid] = {
  //         stref:db.collection('users').doc(auth.currentUser.uid),
  //         ans:{
  //           short:shorts,
  //           long: longs
  //         }
  //       }  
  //     } else if (! data[user.currentUser.data.sem].hasOwnProperty(year)) {
  //       data[user.currentUser.data.sem][year]={}
  //       data[user.currentUser.data.sem][year][sub]={}
  //       data[user.currentUser.data.sem][year][sub][auth.currentUser.uid] = {
  //         stref:db.collection('users').doc(auth.currentUser.uid),
  //         ans:{
  //           short:shorts,
  //           long: longs
  //         }
  //       }
  //     } else if (! data[user.currentUser.data.sem][year].hasOwnProperty(sub)) {
  //       data[user.currentUser.data.sem][year][sub]={}
  //       data[user.currentUser.data.sem][year][sub][auth.currentUser.uid] = {
  //         stref:db.collection('users').doc(auth.currentUser.uid),
  //         ans:{
  //           short:shorts,
  //           long: longs
  //         }
  //       }
  //     } else {
  //       data[user.currentUser.data.sem][year][sub][auth.currentUser.uid] = {
  //         stref:db.collection('users').doc(auth.currentUser.uid),
  //         ans:{
  //           short:shorts,
  //           long: longs
  //         }
  //       }
  //     }
  //     // console.log(data) 
  //     if(!d.exists)
  //       db.collection('answers').doc(user.currentUser.data.course).set(data)
  //     else
  //       db.collection('answers').doc(user.currentUser.data.course).update(data)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      // onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle style={{textAlign:'center'}}>Confirm submit</DialogTitle>
      <DialogContent>
        <DialogContentText style={{textAlign:'center'}}>
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{justifyContent: 'space-evenly'}}>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default function ExamPaper(props) {
  const isVisible = usePageVisibility()
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  // const getConfirmation=()=>{
  //   console.log(open)
  //   // while(true){
  //   //   if(open===false){
  //   //     console.log('a')
  //   //     break
  //   //   }
  //   // }
  // }
  
  // const submitPaper=()=>{
  //   var shorts = JSON.parse(localStorage.getItem('shorts'))
  //   var longs = JSON.parse(localStorage.getItem('longs'))
  //   // setOpen(true);

  //   getConfirmation()
  //   // console.log(shorts, longs)
  // }

//   window.onbeforeunload = function(event) {
//     event.preventDefault();
//     return "Do you really want to leave our brilliant application?";
//     //if we return nothing here (just calling return;) then there will be no pop-up question at all
//     //return;
//  };
 
  useEffect(()=>{
    // document.body.requestFullscreen();

    // if (document.exitFullscreen) {
    //   console.log('closed')
    //   document.exitFullscreen();
    // }



    window.onblur = function(){
      return 'confirm'
    }
    window.onbeforeunload = function(){
      return "Confirm"
    }
    console.log(isVisible)
    if(!isVisible){
      // window.BeforeUnloadEvent
      // window.prompt('Leaving the Exam?')
      
    }
  },[isVisible])

  useEffect(()=>{
    console.log(props.shorts, props.longs)
    props.setShortAnswer(new Array(props.shorts.length))
    props.setLongAnswer(new Array(props.longs.length))
  }, [])

  return (
    <div className={classes.root}>
      {/* <CountDown date={} /> */}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Short Questions" {...a11yProps(0)} />
          <Tab label="Long Questions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>  
      
        <TabPanel value={value} index={0} dir={theme.direction}>
            <ShortQuestions setShortAnswer={props.setShortAnswer} shorts={props.shorts} setShorts={props.setShorts} shortAnswer={props.shortAnswer} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <LongQuestions setLongAnswer={props.setLongAnswer} longs={props.longs} setShorts={props.setLongs} longAnswer={props.longAnswer}/>
        </TabPanel>
        <Button onClick={()=>setOpen(true)}>Submit Paper</Button>
        <ConfirmationDialogRaw 
          classes={{
            paper: classes.paper,
          }}
          keepMounted
          open={open}
          onClose={handleClose}
          sub={props.subject}
          submitpaper={props.submitPaper}
        />
    </div>
  );
}

