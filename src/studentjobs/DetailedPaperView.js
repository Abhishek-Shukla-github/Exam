import {Paper, Button, Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core'

import React from 'react'

const useStyles = makeStyles({
    
    item : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    green : {
        color: '#4caf50'
    },
    red : {
        color: 'red'
    },
    right : {
        border: '4px solid #8bc34a',
        borderRadius: '5px'
    },
    wrong : {
        border: '4px solid #d22e22',
        borderRadius: '5px'
    }
  });
export default function DetailedPaperView(props) {
    const classes = useStyles();
    const year = new Date().getFullYear();
    var total=0
    // const calculate=(index)=>{
    //     setTotal((prev)=>prev+props.paper.answers.short[index].mark)
    // }
    return (
        <div>
            <Button color="primary" onClick={()=>props.setSingleView(false)}>Back</Button>
            <div>
            
                <div className="paperHeading" align="center">Year : {year}</div>
                <div className="paperHeading" align="center">Course : {props.course}</div>
                <div className="paperHeading" align="center">Semester : {props.semester.charAt(1)}</div>
                <div className="paperHeading" align="center">Subject : {props.subject}</div>
                <Divider style={{marginTop:'10px'}}/>
                <Paper component="div" elevation="2" className="elevated_container">
                <div className="paperHeading questionHeading" >Short Questions</div>
                <List className={classes.root}>
                    {
                        props.paper.questions.shorts.length!==0 ?(
                            props.paper.questions.shorts.map((question, index)=>{   
                                total = total + parseInt(props.paper.answers.short[index].mark)
                                
                                return(
                                    <div key={index} className={classes.item}>
                                        <ListItem divider style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                        }}>
                                            <div className='question'>
                                                {index+1+" ) "} {question.q}
                                            </div>
                                            <div className='options'>
                                                <List>
                                                <ListItem key={1}>a) {question.op1}</ListItem>
                                                <ListItem key={2}>b) {question.op2}</ListItem>
                                                <ListItem key={3}>c) {question.op3}</ListItem>
                                                <ListItem key={4}>d) {question.op4}</ListItem>
                                                </List>
                                            </div>
                                            <div><b>Answer : </b>{question[props.paper.answers.short[index].ans]}</div>
                                        </ListItem>
                                        <Typography variant='h5' style={{color:parseInt(props.paper.answers.short[index].mark)!=0?'green':'red'}}>
                                            {Number.isNaN(props.paper.answers.short[index].mark)?'Pending':props.paper.answers.short[index].mark}
                                        </Typography>
                                    </div>
                                )})
                        ) : (
                            'loading'
                        )
                    }
                </List>
                <div className="paperHeading questionHeading">Long Questions</div>
                <List>
                    {
                        props.paper.questions.longs.length!==0 ?(
                            props.paper.questions.longs.map((question, index)=>{
                                total = total + parseInt(props.paper.answers.long[index].mark)
                                return(
                                <div key={index} className={classes.item}>
                                    <ListItem divider style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                    }}>
                                        <div className='question'>
                                            {index+1+" ) "} {question}
                                        </div>
                                        <div><b>Answer : </b> {props.paper.answers.long[index].ans}</div>
                                        
                                        
                                    </ListItem>
                                    <Typography variant='h5' style={{color:parseInt(props.paper.answers.long[index].mark)!=0?'green':'red'}}>
                                        {Number.isNaN(props.paper.answers.long[index].mark)?'Pending':props.paper.answers.long[index].mark}
                                    </Typography>
                                    
                                    
                                </div>
                            )})
                        ) : (
                            'loading'
                        )
                    }
                </List>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', marginTop:'30px'}}>
                    <Typography variant='h5' >
                        Total Marks
                    </Typography>
                    <Typography variant='h5' >
                        {Number.isNaN(total)?'Pending':total}
                    </Typography>
                </div>
                </Paper>
            </div>
            
        </div>
    )
}
