import { Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FinalPaperSubmit(props) {
  const classes = useStyles();

  // useEffect(() => {
  //     console.log(props.year, props.course, props.sem, props.longs, props.shorts )
  // },[])
  return (
    <div>
      <div>Year : {props.year}</div>
      <div>Course : {props.year}</div>
      <div>Semester : {props.sem}</div>
      <div>Subject : {props.subject}</div>
      <div>Short Questions</div>
      <List className={classes.root}>
        {
          props.shorts.length !== 0 ? (
            props.shorts.map((question, index) => (
              <div key={index}>
                <ListItem>{question.q}</ListItem>
                <Typography component="div">
                  <List>
                    <ListItem>
                      {question.op1}
                    </ListItem>
                    <ListItem>
                      {question.op2}
                    </ListItem>
                    <ListItem>
                      {question.op3}
                    </ListItem>
                    <ListItem>
                      {question.op4}
                    </ListItem>
                  </List>
                </Typography>
                <Divider light />
              </div>
            ))
          ) : (
            ''
          )
        }
      </List>

      <div>Long Questions</div>
      <List className={classes.root}>
        {
          props.longs.length !== 0 ? (
            props.longs.map((question, index) => (<div key={index}><ListItem >{question}</ListItem><Divider light /></div>))
          ) : (
            ''
          )
        }
      </List>
    </div>
  )
}
