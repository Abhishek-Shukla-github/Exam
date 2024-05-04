import React, { useContext, useState } from 'react'
import { Button, makeStyles, TextField, Typography,Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import firebase from 'firebase/compat/app';
import { UserContext } from '../App';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    form: {
        width:400,
        marginLeft : 'auto',
        marginRight : 'auto',
        padding: 40,
        border: '1px solid #e0e0e0',
        borderRadius: 10,
    },
    formHead:{
        fontWeight:100,
        textAlign: 'center',
        marginBottom: 30,
    },
    row: {
        marginBottom: 10,
    },
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

export default function Password() {
    const classes = useStyles();
    const loggedInUser = useContext(UserContext);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [msgOpen, setMsgOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const handleClick = () => {
        setMsgOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsgOpen(false);
    };

    const passwordValidate=()=>{
        var patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm;
        return patt.test(newPass)
    }

    const changePassword = (e)=>{
        e.preventDefault();
        
        var user = firebase.auth().currentUser;
        const credential=firebase.auth.EmailAuthProvider.credential(loggedInUser.currentUser.data.email, oldPass)
        
        // Prompt the user to re-provide their sign-in credentials

        user.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        // console.log('yes')
           /* if(!passwordValidate()) {
                setMsg('Password must be at least 6 characters long and contain a \'A-Z\', \'a-z\', \'0-9\' and symbol')
                handleClick()
            } else */if(newPass!==confirmPass){
                setMsg('Passwords don\'t match')
                handleClick()
            } else {
                user.updatePassword(newPass).then(function() {
                    setMsg('Password reset successful')
                    setSuccessOpen(true)
                    setOldPass('')
                    setNewPass('')
                    setConfirmPass('')
                }).catch(function(error) {
                    // An error happened.
                    setMsg(error.message)
                    handleClick()
                });
            }
        }).catch(function(error) {
        // An error happened.
            setMsg('Credential doesn\'t match')
            handleClick()
        });
    }

    return (
        <div>
            <form className={classes.form}>
                <Typography variant='h4' component='h4' className={classes.formHead}>Change Password</Typography>
                <TextField
                    id="standard-password-input"
                    label="Old Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    className={classes.row}
                    onChange={(e)=>setOldPass(()=>e.target.value)}
                />
                <TextField
                    id="standard-password-input"
                    label="New Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    className={classes.row}
                    onChange={(e)=>setNewPass(()=>e.target.value)}
                />
                <TextField
                    id="standard-password-input"
                    label="Re-type New Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    className={classes.row}
                    onChange={(e)=>setConfirmPass(()=>e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={(e)=>changePassword(e)}>
                    Change Password
                </Button>
            </form>
            <Snackbar open={msgOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {msg}
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={()=>setSuccessOpen(false)}>
                <Alert onClose={()=>setSuccessOpen(false)} severity="success">
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}
