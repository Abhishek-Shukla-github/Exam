import React, { useEffect, useState } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RemoveIcon from '@material-ui/icons/Remove';
import db from '../dbconfig'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, MenuItem, Select, Snackbar } from '@material-ui/core';
import '../App.css'
import { doc, updateDoc, setDoc } from "firebase/firestore";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: '80%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 40,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function DisplaySubjects(props) {
    const classes = useStyles();
    const year = "Y"+new Date().getFullYear()
    const [editMode, setEditMode] = useState(false)
    const [editSub, setEditSub] = useState(false)
    // const [sems, setSems] = useState([])
    const [sem, setSem] = useState(null)
    const [keys, setKeys] = useState(null)
    const [semSubject, setSemSubject] = useState([])
    const [newSubject, setNewSubject] = useState([])
    const [subKeys, setSubKeys] = useState([])
    const [subValues, setSubValues] = useState([])
    const [newSubKeys, setNewSubKeys] = useState([])
    const [newSubValues, setNewSubValues] = useState([])
    const [semDialogOpen, setSemDialogOpen] = useState(false)
    const [subDialogOpen, setSubDialogOpen] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [currentCourseData, setCurrentCourseData]=useState('')
    useEffect(()=>{
      setCurrentCourseData(props.courseData[props.course])
      let keys = Object.keys(props.courseData[props.course]).sort()
      setKeys(keys)
      setSemSubject(props.courseData[props.course][keys[0]])
      setSem(keys[0])
      setSubKeys(Object.keys(props.courseData[props.course][keys[0]]))
      setSubValues(Object.values(props.courseData[props.course][keys[0]]))
      setEditMode(false)
    },[props.course])

  
  const handleChange = (value) => {
    if(editMode===false) {
      setSubKeys(Object.keys(currentCourseData[value]))
      setSubValues(Object.values(currentCourseData[value]))
      setSem(value); 
    } else {
      setSnackBarMessage('Save or cancel first')
      setSnackBarOpen(true)
    }   
  }

    const changeKeys=(event, index, old)=>{  
      let val=[]
      if(old){
        val = subKeys
        val[index] = event.target.value
        setSubKeys(val)
      } else {
        val = newSubKeys
        val[index] = event.target.value
        setNewSubKeys(val)
      }
    }
    
    const changeValues=(event, index, old)=>{  
      let val=[]
      if(old){
        val = subValues
        val[index] = event.target.value
        setSubValues(val)
      } else {
        val = newSubValues
        val[index] = event.target.value
        setNewSubValues(val)
      }
    }

    const cancelEdit = () => {
      setNewSubKeys([])
      setNewSubValues([])
      setEditMode(false)
    }

    const save=()=>{
      let data = {}
      subKeys.forEach((k, ind)=>{
        data[k] = subValues[ind]
      })
      newSubKeys.forEach((k, ind)=>{
        data[k] = newSubValues[ind]
      })
      // console.log(data)
      setSubKeys([...subKeys, ...newSubKeys])
      setSubValues([...subValues, ...newSubValues])
      let finaldata = {}
      finaldata[sem] = data
      setSnackBarMessage('Changes Saved')
      setEditMode(false)
      setCurrentCourseData({...currentCourseData, ...finaldata})
        setNewSubKeys([])
        setNewSubValues([])

      updateDoc(doc(db, 'courses', props.course),{...currentCourseData, ...finaldata})
      .then(()=>{
        setSnackBarOpen(true)
      }).catch((error)=>{
        console.error(error)
      })
      
    }
    
    const addSubject = ()=>{
      setNewSubKeys((d)=>[...d, 'New_Subject_Code'+d.length])
      setNewSubValues((d)=>[...d, 'Enter new subject name'+d.length])
    }

    const remove=(val, old)=>{
      console.log(val)
      if(old) {
        setSubKeys((array)=>array.filter((ele, ind)=>ind!=val))
        setSubValues((array)=>array.filter((ele, ind)=>ind!=val))
      } else {
        setNewSubKeys((array)=>array.filter((ele, ind)=>ind!=val))
        setNewSubValues((array)=>array.filter((ele, ind)=>ind!=val))
      }
    }

    const addSem=()=>{
      let semno = "S"+(Object.keys(currentCourseData).length+1)
      let data = {}
      data[semno] = {}
      setCurrentCourseData((v)=>({...v, ...data}))

      // console.log(data)
      setSnackBarMessage('Added Semester '+(keys.length+1))
      updateDoc(doc(db, 'courses', props.course), data)
      .then(()=>{
        setSnackBarOpen(true)
      }).then(()=>{
        console.log('done')
        // props.setReload((v)=>v+1)
      })

      data={}
      data[`${year}.${semno}`]={}

      console.log(props.course)
      updateDoc(doc(db, 'questions', props.course), data)
      .then(()=>{
        setSnackBarOpen(true)
      }).then(()=>{
        console.log('done')
        // props.setReload((v)=>v+1)
      })
    }

    const removeSem=()=>{
      setSemDialogOpen(false)

      if(Object.keys(currentCourseData).length == 1){
        setSnackBarMessage('There should be at least 1 semester in each course')
        setSnackBarOpen(true)
        return
      }


      setSnackBarMessage('Deleted')
        let data = {}
        let ind=1
        Object.keys(currentCourseData).sort().forEach((key)=>{
          if(key!==sem) {
            data["S"+ind] = currentCourseData[key]
            ind+=1
          }
        })

        setDoc(doc(db, 'courses', props.course), data)
        .then(()=>{ 
          // console.log('done') 
          setCurrentCourseData(data)
          setSnackBarOpen(true)       
        })
    }
    
   
    const NewSubject=(props)=>{   
      return(
        <div id={"d"+props.ind} className="subjects">
          <input id={props.newid} className={editMode==false?"noEdit":"textBox"} defaultValue={props.subcode} type="text" readOnly={editMode==false? true: false } onChange={(e)=>changeKeys(e, props.ind, props.newid.charAt(0)=='o'?true:false)}/>
          <input id={props.newid} className={editMode==false?"noEdit":"textBox"} defaultValue={props.ele} type="text" readOnly={editMode==false? true: false } onChange={(e)=>changeValues(e, props.ind, props.newid.charAt(0)=='o'?true:false)}/>
          <IconButton style={{display:editMode===true?'block':'none'}} id={"cell"+props.ind+"b"} color="secondary" size="small" onClick={()=>remove(props.ind, props.newid.charAt(0)=='o'?true:false)}>
            <RemoveIcon />
          </IconButton>
        </div>
      );
    }

    const OldSubject=(props)=>{   
      return(
        <div id={"d"+props.ind} className="subjects">
          <input id={props.id} className={"noEdit"} defaultValue={props.subcode} type="text" readOnly={true} />
          <input id={props.id} className={editMode==false?"noEdit":"textBox"} defaultValue={props.ele} type="text" readOnly={editMode==false? true: false } onChange={(e)=>changeValues(e, props.ind, props.id.charAt(0)=='o'?true:false)}/>
          <IconButton style={{display:editMode===true?'block':'none'}} id={"cell"+props.ind+"b"} color="secondary" size="small" onClick={()=>remove(props.ind, props.id.charAt(0)=='o'?true:false)}>
            <RemoveIcon />
          </IconButton>
        </div>
      );
    }

    return (
      <div>
        <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader  className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>Subjects</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
              
              <TableBody>
              {
              sem!==null && keys!==null? (     
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <div style={{display:'flex', flexFlow:'row', justifyContent: 'start'}}>
                      <FormControl variant="outlined" className={classes.formControl} >
                          {/* <InputLabel id="demo-simple-select-filled-label">Select Course</InputLabel> */}
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={sem}
                            onChange={(event)=>handleChange(event.target.value)}    
                          >
                            {
                              // // console.log(sem, keys)
                              // keys!==null
                              // ? keys.map((ele, index)=><MenuItem key={index} value={ele}>{"Semester "+(index+1)}</MenuItem>)
                              // // :<MenuItem key={0} value={0}>Semester 1</MenuItem>
                              // :null
                            }
                            {
                              // console.log(sem, keys)
                              Object.keys(currentCourseData).length!==0
                              ? Object.keys(currentCourseData).sort().map((ele, index)=><MenuItem key={index} value={ele}>{"Semester "+(index+1)}</MenuItem>)
                              // :<MenuItem key={0} value={0}>Semester 1</MenuItem>
                              :null
                            }
                          </Select>
                      </FormControl>
                            {
                              editMode
                              ? null
                              : <div style={{display:'flex', flexFlow:'column', justifyContent: 'start'}}>
                                  <Button color="secondary" onClick={()=>setSemDialogOpen(true)}>Remove</Button>
                                  <Button color="primary" onClick={addSem}>Add</Button>
                                </div>
                            }                    
                    </div> 
                  </StyledTableCell>
                  <StyledTableCell>
                    <div id='cell'>
                    {
                      // console.log(semSubject)
                      semSubject!=null 
                      ?
                      // Object.keys(semSubject).map((k, ind)=>
                      //   <NewSubject newid={"o"+ind} ele={semSubject[k]} ind={ind} subcode={k} key={k}/>
                      // )
                        subKeys.map((k, ind)=><OldSubject id={"o"+ind} ele={subValues[ind]} ind={ind} subcode={k} key={k}/>) 
                        // console.log(Object.keys(currentCourseData[sem]).map((k, ind)=><OldSubject id={"o"+ind} ele={subValues[ind]} ind={ind} subcode={k} key={k}/>))
                        // Object.keys(currentCourseData[sem]).map((k, ind)=><OldSubject id={"o"+ind} ele={currentCourseData[sem][k]} ind={ind} subcode={k} key={k}/>)
                      : null
                      
                      
                      // semSubject!=null && semSubject.length>0
                      // ?
                      // semSubject.forEach((ele, ind)=>{
                      //     console.log(Object.keys(ele))
                      //     let keys = Object.keys(ele)
                      //     // <NewSubject newid={"o"+ind} ele={ele[k]} ind={ind} key={k}/>
                      //     keys.map((k)=>console.log(ele[k]))
                      // })
                      // : ''
                    }
                    </div>
                    <div id='newsubjects' > 
                      {
                        newSubKeys.length===0
                        ? null
                        :(
                          // newSubject.map((ele, ind)=> <NewSubject newid={"n"+ind} ele={ele} ind={ind} key={ind}/>)
                          newSubKeys.map((k, ind)=><NewSubject newid={"n"+ind} ele={newSubValues[ind]} ind={ind} subcode={k} key={k}/>)
                        )
                      }
                    </div>
                    {
                      editMode===true
                      ? <Button color="primary" onClick={()=>addSubject()}>Add</Button>
                      :null
                    }
                  </StyledTableCell>               
                  <StyledTableCell>
                  {
                    editMode===true
                    ?
                      <div style={{display:'flex', flexFlow:'column', justifyContent: 'start'}}>
                        <Button variant="contained" id="save" onClick={()=>{save()}} style={{marginBottom:'5px'}}>Save</Button>
                        <Button variant="contained" id="cancel" onClick={cancelEdit}>Cancel</Button> 
                      </div>
                    :<Button variant="contained" id="edit" onClick={()=>{setEditMode(true)}}>Edit</Button>
                  }       
      
                </StyledTableCell>
                </StyledTableRow>
              ):null
              }
              </TableBody>
          
        </Table>
        </TableContainer>
        
        <Dialog
          id='semdeldialog'
          open={semDialogOpen}
          onClose={()=>setSemDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to delete the semester?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you surely want to delete the semester then press <b>Yes</b> otherwise <b>press No</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setSemDialogOpen(false)} color="primary">
              No
            </Button>
            <Button onClick={removeSem} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          id='subdeldialog'
          open={subDialogOpen}
          onClose={()=>setSubDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to delete the subject?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete the subject all related data will be removed with this subject
              If you surely want to delete the subject then press <b>Yes</b> otherwise <b>press No</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setSubDialogOpen(false)} color="primary">
              No
            </Button>
            <Button onClick={null} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
  );
}
