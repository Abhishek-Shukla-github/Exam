import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {Typography, InputLabel, Button, MenuItem, Select, Snackbar  } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import db,{auth, provider} from './dbconfig';
import firebase from 'firebase';

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

export default function SignupFinalPart(props){
    const classes = useStyles();
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirm, setConfirm] = useState('')
    // const [date, setDate] = useState('')
    // const [addr, setAddr] = useState('')
    
    const [contact, setContact] = useState('')
    const [regno, setRegno] = useState('');
    const [roll, setRoll] = useState('');
    // const [sem, setSem] = useState('');
    const [msg, setMsg] = useState('');



    // useEffect(()=>{
    //     console.log(auth.currentUser)

    // },[])
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

        // if(course == '')
        // {
        //     setMsg('Select a course')
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
        
        // if(confirm == '' || password!==confirm)
        // {
        //     setMsg('Passwords do not match')
        //     setErrorOpen(true)
        //     return false
        // }

        return true
    }

   

    const signup = (e)=>{
        e.preventDefault();
        if(!validate())
            return

        

        // auth.createUserWithEmailAndPassword(email, password)
        // .then((result) => {
        //   //console.log(typeof(result.user.uid), type);
        // //   const regno = Math.floor(1000+Math.random()*(9000))
        // //   const roll = Math.floor(1000+Math.random()*(9000))
        //   setSem('S1')
        //   //write to database
        //     const user = auth.currentUser;

        //     user.sendEmailVerification().then(function(result) {
        //     // Email sent.
        //         console.log(result)
        //     }).catch(function(error) {
        //     // An error happened.
        //         console.log(error.message)
        //         setMsg(error.message)
        //         setErrorOpen(true)
        //     });

        // }).catch(function(error) {
        // // An error happened.
        //     console.log(error.message)
        //     setMsg(error.message)
        //     setErrorOpen(true)
        // });
          auth.currentUser.updateProfile({
            displayName: name,
            phoneNumber:contact,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
              console.log('hoyechhe')
            // Update successful.
          }).catch(function(error) {
            // An error happened.
            console.log(error)
          });

        //   db.collection('users').doc(result.user.uid).set({
        //     usertype : 'Student',
        //     name : name,
        //     course : course,
        //     // dob : date,
        //     // address : addr,
        //     // email : email,
        //     contact : contact,
        //     regno : regno,
        //     roll : roll,
        //     sem : 'S1'
        //   })
        //   .then(()=>{
        //     // setSuccessOpen(true)
        //     // setName('')
        //     // setCourse('')
        //     // setEmail('')
        //     // setPassword('')
        //     // setConfirm('')
        //     // setDate('')
        //     // setAddr('')
        //     // setContact('')
        //   }).catch((error) => {
        //     setMsg(error.message)
        //     setErrorOpen(true)
        //   }); 
        
    } 
      

      const sendOtp=()=>{
         
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

        
            {/* <TextField fullWidth className={classes.root} required id="email" value={email} onChange={e=>setEmail(e.target.value)} label='Enter email provided by college' variant="outlined"/>
            

            <TextField fullWidth className={classes.root} required id="pass" type="password" value={password} onChange={e=>setPassword(e.target.value)} label='Enter password' variant="outlined"/>
                
            <TextField fullWidth className={classes.root} required id="confirm" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} label='Confirm password' variant="outlined"/>
            <Button variant="contained" color="primary" className={classes.button} onClick={signup}>
                Sign up
            </Button> */}
            <form className={classes.form} noValidate autoComplete="off">
               
                
                <TextField fullWidth required id="name" value={name} onChange={e=>setName(e.target.value)} label='Enter Name' variant="outlined"/>
                
                <InputLabel className={classes.root}>Select Course</InputLabel>
                {/* <Select
                value={course}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
                id="course"
                >
      
                    {
                        props.courses.map((val, index)=><MenuItem key={index} value={val}>{val}</MenuItem>)
                    }

                </Select> */}
                
                
                
                <TextField fullWidth className={classes.root} id="contact" onChange={e=>setRegno(e.target.value)} label='Enter Registration No' variant="outlined"/>

                <TextField fullWidth className={classes.root} id="contact" onChange={e=>setRoll(e.target.value)} label='Enter Roll No' variant="outlined"/>

                <TextField fullWidth className={classes.root} id="contact" onChange={e=>setContact(e.target.value)} label='Enter Contact' variant="outlined"/>
                
                
                
                <Button variant="contained" color="primary" className={classes.button} onClick={signup}>
                    Sign up
                </Button>
            </form>
        </div>
        
    );
}
