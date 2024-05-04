import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {Typography, InputLabel, Button, MenuItem, Select, Snackbar, FormControl  } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import db,{auth} from '../dbconfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2em'
    },
    form: {
        marginTop: '2em',
        // width:'60%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        float:'right',
        marginTop: '2em'   
    },
    paper : {
        padding : '10px',
        marginLeft : '10px'
    },

}));

export default function AddStudent(props){
    const classes = useStyles();
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    // const [date, setDate] = useState('')
    // const [addr, setAddr] = useState('')

    const [contact, setContact] = useState('')
    const [regno, setRegno] = useState('');
    const [roll, setRoll] = useState('');
    const [sem, setSem] = useState('');
    const [msg, setMsg] = useState('');

    const handleChange = (event) => {
        setCourse(event.target.value);
    };

    const validate = () =>{
        if(name == '')
        {
            setMsg('Enter a name')
            setErrorOpen(true)
            return false
        }
        if(course == '')
        {
            setMsg('Select a course')
            setErrorOpen(true)
            return false
        }

        // if(email == '' || !email.endsWith('@heritageit.edu.in'))
        if(email == '' )
        {
            setMsg('Enter an email')
            setErrorOpen(true)
            return false
        }
        if(password == '')
        {
            setMsg('Enter a password')
            setErrorOpen(true)
            return false
        } 
        else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            setMsg('The Password should contain atleast an Uppercase, a Lowercase, a digit and a symbol')
            setErrorOpen(true)
            return false
        }
        if(sem == '')
        {
            setMsg('Select Semester')
            setErrorOpen(true)
            return false
        }
        // if(addr == '')
        // {
        //     setMsg('Enter your address')
        //     setErrorOpen(true)
        //     return false
        // }
        
        if(contact == '')
        {
            setMsg('Enter your contact no.')
            setErrorOpen(true)
            return false
        } else if(/^[\d]{10}$/.test(contact) == false ) {
            setMsg('Enter proper contact no.')
            setErrorOpen(true)
            return false
        }
        
        if(confirm == '' || password!==confirm)
        {
            setMsg('Passwords do not match')
            setErrorOpen(true)
            return false
        }

        return true
    }

    const signup = (e)=>{
        e.preventDefault();
        if(!validate())
            return

        // auth.createUserWithEmailAndPassword(email, password)
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            sendEmailVerification(auth.currentUser).then(function(result) {
            // Email sent.
                console.log(result)
            }).catch(function(error) {
            // An error happened.
                console.log(error.message)
                setMsg(error.message)
                setErrorOpen(true)
            });
            //write to database

            setDoc(doc(db, "users", result.user.uid), {
                usertype : 'Student',
                name : name,
                course : course,
                email : email,
                contact : contact,
                regno : regno,
                roll : roll,
                sem : sem
            }).then(()=>{
                setSuccessOpen(true)
                setName('')
                setCourse('')
                setEmail('')
                setPassword('')
                setConfirm('')
                setSem('')
                setContact('')
            }).catch((error) => {
                setMsg(error.message)
                setErrorOpen(true)
            })

            // db.collection('users').doc(result.user.uid).set({
            //     usertype : 'Student',
            //     name : name,
            //     course : course,
            //     // dob : date,
            //     // address : addr,
            //     email : email,
            //     contact : contact,
            //     regno : regno,
            //     roll : roll,
            //     sem : sem
            // }).then(()=>{
            //     setSuccessOpen(true)
            //     setName('')
            //     setCourse('')
            //     setEmail('')
            //     setPassword('')
            //     setConfirm('')
            //     setSem('')
            //     // setAddr('')
            //     setContact('')
            // }).catch((error) => {
            //     setMsg(error.message)
            //     setErrorOpen(true)
            // })
        }).catch(function(error) {
            // An error happened.
            console.log(error.message)
            setMsg(error.message)
            setErrorOpen(true)
        });
    } 
      

    return(
        <div>
            <Typography variant="h3" component="h2">
                Add a student
            </Typography>
            <Snackbar open={successOpen} autoHideDuration={4000} onClose={()=>setSuccessOpen(false)}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Account created — <strong>successfully</strong>
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={4000} onClose={()=>setErrorOpen(false)}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{msg}</strong>
                </Alert>
            </Snackbar>

        
            
            
            <form className={classes.form} noValidate autoComplete="off">
               
                <TextField fullWidth className={classes.root} required id="email" value={email} onChange={e=>setEmail(e.target.value)} label='Enter email provided by college' variant="outlined"/>
                
                <TextField fullWidth className={classes.root} required id="pass" type="password" value={password} onChange={e=>setPassword(e.target.value)} label='Enter password' variant="outlined"/>
                    
                <TextField fullWidth className={classes.root} required id="confirm" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} label='Confirm password' variant="outlined"/>

                <TextField fullWidth className={classes.root} required id="name" value={name} onChange={e=>setName(e.target.value)} label='Enter Name' variant="outlined"/>
                <FormControl variant="outlined" className={classes.root} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Select Course</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //   value={age}
                    value={course}
                    onChange={handleChange}
                    label="Select Course"
                    >
                        { 
                            props.courses.map((val, index)=><MenuItem key={index} value={val}>{val}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                
                <FormControl variant="outlined" className={classes.root} fullWidth>
                    <InputLabel id="semester-select-outlined-label">Select Semester</InputLabel>
                    <Select
                    labelId="semester-select-outlined-label"
                    id="semester-select-outlined"
                    //   value={age}
                    value={sem}
                    onChange={(e)=>setSem(e.target.value)}
                    label="Select Semester"
                    >
                        { 
                           ['Semester 1', 'Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'].map((val, index)=><MenuItem key={index} value={'S'+(index+1)}>{val}</MenuItem>)
                        }
                    </Select>
                </FormControl>

                {/* <TextField fullWidth className={classes.root} id="sem" onChange={e=>setSem(e.target.value)} label='Enter Semester' variant="outlined"/> */}

                <TextField fullWidth className={classes.root} id="regno" onChange={e=>setRegno(e.target.value)} label='Enter Registration No' variant="outlined"/>

                <TextField fullWidth className={classes.root} id="roll" onChange={e=>setRoll(e.target.value)} label='Enter Roll No' variant="outlined"/>

                <TextField fullWidth className={classes.root} id="contact" onChange={e=>setContact(e.target.value)} label='Enter Contact' variant="outlined"/>
                
                
                
                <Button variant="contained" color="primary" className={classes.button} onClick={signup}>
                    Sign up
                </Button>
            </form>
        </div>
        
    );
}
