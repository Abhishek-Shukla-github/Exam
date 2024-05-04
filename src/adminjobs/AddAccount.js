import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AddStudent from './AddStudent';
import AddExaminer from './AddExaminer';
import AddAdmin from './AddAdmin';
import { Button } from '@material-ui/core';
import UseDataApi from '../api/Apis';


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
    maxWidth: '600px',
    marginLeft:'auto',
    marginRight:'auto',
  },
}));

export default function AddAccount(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // const [show, setShow] = useState(false);
  // const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const {courses: coursesData, getCourses} = UseDataApi()

  useEffect(()=>{
    getCourses()
  },[])

  useEffect(()=>{
    if(coursesData.length!=0)
      setCourses(coursesData)
  },[coursesData])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  // const showStudents=()=>{
  //   setShow(true)
  //   db.collection('users').where("usertype", "==", 'Student').get()
  //   .then((data)=>{
  //     //console.log(data.docs)
  //     var d = []
  //     data.docs.forEach(element => {
  //       //console.log(element.data())
  //       d.push(element.data())
  //     });
  //     setStudents(d)
  //   }).then(()=>{setShow(true)})
  // }
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={()=>props.setSignup(false)}>Back</Button>
      <AppBar position="static" color="default">
      
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Student" {...a11yProps(0)} />
          <Tab label="Administrator" {...a11yProps(1)} />
          <Tab label="Examiner" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
        <TabPanel value={value} index={0} dir={theme.direction}>
            <AddStudent courses={courses}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <AddAdmin/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <AddExaminer/>
        </TabPanel>

    </div>
  );
}
