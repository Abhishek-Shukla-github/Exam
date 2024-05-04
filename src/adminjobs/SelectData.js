import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Snackbar } from '@material-ui/core'
import React, { useState } from 'react'

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
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('')
    
    const handleChange = (value)=>{
        let sem = props.courseData.find((ele)=> ele.id == value).data()
        if(Object.keys(sem).length != 0) {
            const year = Object.keys(sem).sort().reverse()[0]
            props.setCurCourseData(sem[year])
            props.setSems(Object.keys(sem[year]).sort())
            props.setCourse(value)
            props.setSem('')
            props.setSubject(null)
        } else {
            setSnackBarMessage('Not enough questions to set paper')
            setSnackBarOpen(true)
            props.setSem('')
        }
        

        // props.setValidSteps((array)=>{
        //     array[props.activeStep]=false
        //     return array
        // })
    }

    const handleSemChange=(value)=>{
        props.setSem(value) 
        let sems = props.data.filter((ele)=>{if (ele.id == props.course) return ele.data()})
        let subs = sems[0].data()[value]
        subs = Object.keys(props.curCourseData[value]).filter((ele)=> (!props.curCourseData[value][ele].hasOwnProperty('prepared') || props.curCourseData[value][ele].prepared==false) && props.curCourseData[value][ele].published==false )

        if(subs.length!=0){         
            props.setSubject('') 
        } else {
            setSnackBarMessage('Not enough questions to set paper')
            setSnackBarOpen(true)
        }
            
        let data={}
        subs.forEach((ele)=>{
            data[ele] = sems[0].data()[value][ele]
        })
        console.log(data)
        props.setSubjects(data)
        props.setValidSteps((array)=>{
            array[props.activeStep]=false
            return array
        })
    }

    const handleSubChange=(value)=>{
        console.log(value)
        props.setSubject(value)
        
        props.setValidSteps((array)=>{
            array[props.activeStep]=true
            return array
        })
    }

    return (
        <div>
            {console.log(props.courses)}
            {
                props.courses!==null ? (
                    <FormControl variant="filled" className={classes.formControl} fullWidth disabled={props.courses.length==0}>
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
                    props.sems.map((ele, index)=><MenuItem key={ele} value={ele}>{"Semester "+(ele.substring(1))}</MenuItem>)
                }
                </Select>
            </FormControl>

            <FormControl variant="filled" className={classes.formControl} fullWidth disabled={props.subject==null}>
                <InputLabel id="demo-simple-select-filled-label">Select Subject</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.subject?props.subject:''}
                onChange={(e)=>handleSubChange(e.target.value)}    
                >
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
