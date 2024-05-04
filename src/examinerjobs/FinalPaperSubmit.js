import { Divider, List, ListItem, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    items : {
        display : 'block'
    }
}));

export default function FinalPaperSubmit(props) {
    const classes = useStyles();

    return (
        <div>
            <div>Year : {props.year}</div>
            <div>Course : {props.course}</div>
            <div>Semester : {props.sem}</div>
            <div>Subject : {props.subject}</div>
            <div>Short Questions</div>
            <List className={classes.root}>
                {
                    props.shortQ.length!==0 ?(
                        props.shortQ.map((question, index)=> (
                            <div key={index}>
                                <ListItem className={classes.items}>
                                    <div className='question'>
                                        {index+1} {question.q}
                                    </div>
                                    <div className='options'>
                                        <List>
                                           <ListItem key={1}>a) {question.op1}</ListItem>
                                           <ListItem key={2}>b) {question.op2}</ListItem>
                                           <ListItem key={3}>c) {question.op3}</ListItem>
                                           <ListItem key={4}>d) {question.op4}</ListItem>
                                        </List>
                                    </div>
                                </ListItem>
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
                    props.longQ.length!==0 ?(
                        props.longQ.map((question, index)=>(<div  key={index}><ListItem>{question}</ListItem><Divider light /></div>))
                    ) : (
                        ''
                    )
                }
            </List>
        </div>
    )
}
