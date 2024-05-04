import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Box, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function LongQuestions(props) {
  const classes = useStyles();
  const paperLength = 10; // change this to 10
  const handleToggle = (index) => () => {
    
    const currentIndex = props.longChecked.indexOf(index);
    const newChecked = [...props.longChecked];
    if (currentIndex === -1 ) {
      if (props.longChecked.length === paperLength) {
        return
      }   
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (newChecked.length===paperLength) {
      props.setLongs(()=> newChecked.map((ele)=>props.curCourseData[props.sem][props.subject]['long'][ele]) )
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

    props.setLongChecked(newChecked);

  };


  return (
    <div>
        <Box  m={1} p={2}>
            <span>Total Selected : {props.longChecked.length}/10</span>
        </Box>
        <List className={classes.root} >
            {props.curCourseData[props.sem][props.subject]['long'].map((value, index) => {
                
                const labelId = `checkbox-list-label-${index}`;
                // console.log(labelId)
                return (
                    <div key={index}>
                        <ListItem  role={undefined} dense button onClick={handleToggle(index)}>
                            <ListItemIcon>
                              <Checkbox
                                  edge="start"
                                  checked={props.longChecked.indexOf(index) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}                               
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItem>
                        <Divider light />
                    </div>
                );
            })}
        </List>
    </div>
    
    
  );
}
