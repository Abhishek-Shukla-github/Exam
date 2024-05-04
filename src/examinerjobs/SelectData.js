import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Snackbar } from '@material-ui/core'
import React, { useState } from 'react'
import { auth } from '../dbconfig';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectData(props) {
    const classes = useStyles();     
    const [snackBarMessage, setSnackBarMessage]=useState('')
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    
    console.log(props.questionData)
    const handleChange=(value)=>{
        let sems = props.courseData.filter((ele)=>{if (ele.id == value) return ele.data()})
        props.setCurCourseData(sems[0].data())
        console.log(sems[0].data())
        props.setSems(Object.keys(sems[0].data()).sort())
        props.setCourse(value)
        props.setSem('')
        props.setSubject(null)

        props.setValidSteps((array)=>{
            array[props.activeStep]=false
            return array
        })
    }

    const handleSemChange=(value)=>{ 
        let data = props.questionData.filter((doc)=>{if(doc.id==props.course) return doc})
        const year = new Date().getFullYear();
        console.log(data[0].data())
        const subs = Object.keys(props.curCourseData[value]).filter((sub)=>{
            if(!data[0].data().hasOwnProperty('Y'+year)
            || !data[0].data()['Y'+year].hasOwnProperty(value) 
            || !data[0].data()['Y'+year][value].hasOwnProperty(sub))
                // console.log(sub)
                return sub
            else {
                if (data[0].data()['Y'+year][value][sub].examiners.filter((user)=>user.id===auth.currentUser.uid).length == 0)
                // console.log(sub)
                return sub
            }
        })

        if(subs.length == 0){
            setSnackBarMessage('No subject is left in Semester '+value.substring(1)+' for creating paper')
            setSnackBarOpen(true)
            return
        }
        data={}
        subs.forEach((sub)=>data[sub]=props.curCourseData[value][sub])
        props.setSubjects(data)
        props.setSem(value)
        props.setSubject('')

        props.setValidSteps((array)=>{
            array[props.activeStep]=false
            return array
        })
    }

    const handleSubChange=(value)=>{
        props.setSubject(value)
        props.setValidSteps((array)=>{
            array[props.activeStep]=true
            return array
        })
    }

    return (
        <div>
            {
                props.courses!==null ? (
                    <FormControl variant="filled" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-filled-label">Select course</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={props.course?props.course:''}
                        onChange={(e)=>handleChange(e.target.value)}    
                        >
                        {
                            props.courses.map((ele)=><MenuItem key={ele} value={ele}>{ele}</MenuItem>)
                        }
                        </Select>
                    </FormControl>
                ) : (
                    ''
                )
            }
           
            
            <FormControl variant="filled" className={classes.formControl} fullWidth disabled={props.sem==null}>
                <InputLabel id="demo-simple-select-filled-label">Select Semester</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.sem?props.sem:''}
                onChange={(e)=>handleSemChange(e.target.value)}    
                >
                {
                    props.sems.map((ele, index)=><MenuItem key={ele} value={ele}>{"Semester "+(index+1)}</MenuItem>)
                }
                </Select>
            </FormControl>

            <FormControl variant="filled" className={classes.formControl} fullWidth disabled={props.subject==null}>
                <InputLabel id="demo-simple-select-filled-label">Select Subject</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.subject?props.subject:''}
                onChange={(e)=>handleSubChange(e.target.value)}>
                {
                    Object.keys(props.subjects).map((ele, index)=><MenuItem key={ele} value={ele}>{props.subjects[ele]}</MenuItem>)
                }
                </Select>
            </FormControl>
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
    )
}
