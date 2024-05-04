import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Typography, InputLabel, Button, MenuItem, Select, Snackbar  } from '@material-ui/core';
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
        width:'100%'
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
    }
}));


export default function AddAdmin(){
    const classes = useStyles();
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirm, setConfirm] = React.useState('')
    const [msg, setMsg] = React.useState('');

    const validate = () =>{
        if(name == '')
        {
            setMsg('Enter a name')
            setErrorOpen(true)
            return false
        }
        
        // if(email == '' || !email.endsWith('@heritageit.edu.in'))
        if(email == '')
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
        } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            setMsg('The Password should contain atleast an Uppercase, a Lowercase, a digit and a symbol')
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
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            sendEmailVerification(auth.currentUser).then(function(res) {
            // Email sent.
                console.log(res)
            }).catch(function(error) {
            // An error happened.
                console.log(error.message)
                setMsg(error.message)
                setErrorOpen(true)
            });

            setDoc(doc(db, "users", result.user.uid),{
                usertype : 'Administrator',
                name : name,
            }).then(()=>{
                setSuccessOpen(true)
                setName('')
                setEmail('')
                setPassword('')
                setConfirm('')
            }).catch((error) => {
                setMsg(error.message)
                setErrorOpen(true)
            });
        })
        .catch((error) => {
          setMsg(error.message)
          setErrorOpen(true)
        });
      }
    return(
        <div>
            { console.log(auth.currentUser)}
            <Typography variant="h3" component="h2">
                Add an Administrator
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
                <Button variant="contained" color="primary" className={classes.button} onClick={signup}>
                    Sign up
                </Button>
            </form>
        </div>
        
    );
}
