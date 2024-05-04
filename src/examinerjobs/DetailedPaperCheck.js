import { Button, Divider, FormControlLabel, IconButton, List, ListItem, makeStyles, Paper, Radio, RadioGroup, TextField } from '@material-ui/core'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import db from '../dbconfig'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from 'react'

const useStyles = makeStyles({
    
    item : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
export default function DetailedPaperCheck(props) {
    const classes = useStyles();
    const year = new Date().getFullYear();
    const [student, setStudent] = useState({})
    const [checkedPaper, setCheckedPaper] = useState({
        long : props.paper.answers.long,
        short : props.paper.answers.short
    })

    const marksSubmitted = useMemo(()=>{
        let found = checkedPaper.long.find( item => item.mark === '')
        if(found)
            return false
        found = checkedPaper.short.find( item => item.mark === '')
        if(found)
            return false
        return true
    }, [checkedPaper])

    useEffect(() => {
        // console.log(props.paper.stref)
        // props.paper.stref.get()
        getDoc(props.paper.stref)
        .then((doc)=>{
            setStudent({
                name: doc.data().name,
                regno: doc.data().regno,
                rollno: doc.data().roll,
            })
        })
    },[])

    const setShortMarks=(index, mark)=>{
        // console.log(index, mark)
        let data = checkedPaper
        data.short[index].mark = mark+""
        setCheckedPaper(data)
    }
    const setLongMarks=(index, mark)=>{
        // console.log(checkedPaper.long)
        let data = checkedPaper
        data.long[index].mark = mark+""
        setCheckedPaper(data)
    }

    const submitMarks=()=>{
        let data = {}
        data[`${props.paper.semester}.Y${year}.${props.paper.subject}.${props.paper.stref.id}.ans`] = checkedPaper
        // console.log(data)
        // db.collection('answers').doc(props.paper.course).update(data)
        updateDoc(doc(db, 'answers', props.paper.course), data)
        let complete = true
        checkedPaper.short.forEach((element)=>{
            if(element.mark.trim()=='')
                complete = false
        })
        checkedPaper.long.forEach((element)=>{
            if(element.mark.trim()=='')
                complete = false
        })
        data={}
        data[`${props.paper.semester}.Y${year}.${props.paper.subject}.${props.paper.stref.id}.complete`] = complete
        // db.collection('answers').doc(props.paper.course).update(data)
        updateDoc(doc(db, 'answers', props.paper.course), data)
        props.setShowDetails(false)
    }

    return (
        <div>
            <Button color="primary" onClick={()=>props.setShowDetails(false)}>Back</Button>
            {console.log(props.paper)}
            <div>
                <div className="paperHeading" align="center">Year : {year}</div>
                <div className="paperHeading" align="center">Course : {props.paper.course}</div>
                <div className="paperHeading" align="center">Semester : {props.paper.semester}</div>
                <div className="paperHeading" align="center">Subject : {props.paper.subject}</div>
                <div className="paperHeading" align="center">Student's Name : {student.name}</div>
                <div className="paperHeading" align="center">Student's RegNo : {student.regno}</div>
                <div className="paperHeading" align="center">Student's Roll No : {student.rollno}</div>
                <Divider style={{marginTop:'10px'}}/>
                <Paper component="div" elevation={2} className="elevated_container">
                <div className="paperHeading questionHeading">Short Questions</div>
                <List className={classes.root}>
                    {
                        props.paper.questions.shorts.length!==0 ?(
                            props.paper.questions.shorts.map((question, index)=> (
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
                                    
                                    {
                                        props.paper.answers.short[index].mark.trim() == '' 
                                        //  checkedPaper.short[index].mark.trim() == ''
                                        ?
                                            <div className="papercheck_item">
                                                {/* <IconButton className={classes.green} onClick={()=>setShortMarks(index, 1)}>
                                                    <CheckIcon fontSize='large'	/>
                                                </IconButton>
                                                <IconButton className={classes.red} onClick={()=>setShortMarks(index, 0)}>
                                                    <ClearIcon fontSize='large'/>
                                                </IconButton> */}
                                                <RadioGroup aria-label="gender" name="marking" 
                                                    // value={checkedPaper.short[index].mark.trim()} 
                                                    onChange={(e)=>setShortMarks(index, e.target.value)}>
                                                    <FormControlLabel value="1" control={<Radio />} label="Correct" />
                                                    <FormControlLabel value="0" control={<Radio />} label="Incorrect" />  
                                                </RadioGroup>
                                            </div>
                                        :
                                            <div className="papercheck_item">
                                                <b>Checked </b> <LibraryAddCheckIcon fontSize='large'	/>
                                            </div>
                                    } 
                                    {/* {
                                        // console.log(props.paper.answers.short[index].mark.trim() == '')
                                        props.paper.answers.short[index].mark.trim() != '' 
                                        ? checkedPaper.short[index].mark.trim() == '0'
                                            ? <div className={classes.wrong}></div>
                                            : <div className={classes.right}></div>
                                        : ''
                                    }   */}
                                </div>
                            ))
                        ) : (
                            'loading'
                        )
                    }
                </List>
                <div className="paperHeading questionHeading">Long Questions</div>
                <List className={classes.root}>
                    {
                        props.paper.questions.longs.length!==0 ?(
                            props.paper.questions.longs.map((question, index)=>(
                                <div key={index} className={classes.item}>
                                    <ListItem divider style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                    }}>
                                        <div className='question'>
                                            {index+1+" ) "} {question}
                                        </div>
                                        <div><b>Answer : </b>{props.paper.answers.long[index].ans}</div>
                                        {
                                            props.paper.answers.long[index].mark.trim() == '' 
                                             && 
                                            <TextField type='number' style={{width:'130px'}} margin='normal' id="outlined-basic" label="Enter marks" variant="outlined"  onChange={(e)=>setLongMarks(index, e.target.value)}/>
                                            
                                            
                                        }
                                        
                                    </ListItem>
                                    {/* {console.log(checkedPaper.long[index].mark)} */}
                                    {props.paper.answers.long[index].mark.trim() != '' && <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                <b>Checked</b> <LibraryAddCheckIcon fontSize='large'	/>
                                            </div>}
                                </div>
                            ))
                        ) : (
                            'loading'
                        )
                    }
                </List>
                </Paper>
            </div>
            {console.log(marksSubmitted)}
            {marksSubmitted === false && <Button color="primary" onClick={submitMarks}>Submit Marks</Button>}
        </div>
    )
}
