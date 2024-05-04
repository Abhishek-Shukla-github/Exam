import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Box, Divider, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

// export default function ShortQuestions(props) {

//     return (
//         <div>
//             {
//                 console.log(props.courseData[props.year][props.sem][props.subject]['short'])
//             }
//         </div>
//     )
// }

export default function ShortQuestions(props) {
  const classes = useStyles();
  
  
  const paperLength = 5 // change this to 10

  const handleToggle = (index) => () => {
    
    const currentIndex = props.shortChecked.indexOf(index);
    const newChecked = [...props.shortChecked];
    if (currentIndex === -1 ) {
      if (props.shortChecked.length === paperLength) {
        console.log("Already checked 10")
        return
      }   
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    // console.log(newChecked, props.shorts)
    if (newChecked.length===paperLength) {
      props.setShorts(()=> newChecked.map((ele)=>props.curCourseData[props.sem][props.subject]['short'][ele]) )      
      props.setValidSteps((array)=>{
        array[props.activeStep]=true
        return array
      })
    } else {
      props.setValidSteps((array)=>{
        array[props.activeStep]=false
        return array
      })
    }

    props.setShortChecked(newChecked);

  };


  return (
    <div>
        <Box  m={1} p={2}>
            <span>Total Selected : {props.shortChecked.length}/10</span>
        </Box>
        <List className={classes.root} >
          
            {props.curCourseData[props.sem][props.subject]['short'].map((value, index) => {
                // console.log(value.q)
                const labelId = `checkbox-list-label-${index}`;
                // console.log(labelId)
                return (
                    <div key={index}>
                        <ListItem  role={undefined} dense button onClick={handleToggle(index)}>
                            <ListItemIcon>
                              <Checkbox
                                  edge="start"
                                  checked={props.shortChecked.indexOf(index) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}                               
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.q} />
                        </ListItem>
                        <Typography component="div">
                            <List>
                              <ListItem>
                                <ListItemText primary={value.op1}/>
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={value.op2}/>
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={value.op3}/>
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={value.op4}/>
                              </ListItem>
                            </List>
                        </Typography>
                        <Divider light />
                    </div>
                );
            })}
        </List>
    </div>
    
    
  );
}
