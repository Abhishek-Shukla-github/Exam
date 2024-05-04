import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './App';
import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AddAccount from './adminjobs/AddAccount';
import Loading from './Loading'
import { signInWithEmailAndPassword } from "firebase/auth";
import db,{auth} from './dbconfig';
import { doc, getDoc } from "firebase/firestore";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(/login_splash.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff',
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [signup, setSignup] = useState(false);
  const [type, setType] = useState('');
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [loginFailOpen, setLoginFailOpen] = React.useState(false);
  const [typeError, setTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  
  //methods
  const handleLogin = () => {
    setLoginFailOpen(true);
  };

  const handleLoginClose = () => {
    setLoginFailOpen(false);
  };

  const validate = ()=> {
    let ans = true, msg ='' 
    // if(type=='') {
    //   setTypeError(true)
    //   ans = false
    //   msg = 'Select user-type'
    // } else {
    //   setTypeError(false)
    // }
    if(email=='') {
      setNameError(true)
      ans = false
      msg = 'Enter email properly'
    } else {
      setNameError(false)
    }
    if(values.password=='') {
      setPassError(true)
      ans = false
      msg = 'Enter password'
    } else {
      setPassError(false)
    }
    setErrorMsg(msg)
    return ans
  }
  const login = (e)=>{
    e.preventDefault();
    //console.log(type=='')
    if(!validate()) {
      handleLogin()
      return
    }
    setLoading(true) 
    signInWithEmailAndPassword(auth, email, values.password)
    .then((result)=>{
      // console.log(result)
      // getDoc(doc(db, "users", result.user.uid))
      // .then((doc)=>{
      //   setLoading(false)
      //   // console.log(doc.)
      //   if(doc.data().usertype==type){
      //     // console.log(result.user.uid, type)
      //     user.action({
      //       type:"LOGIN",
      //       data: {...result.user,  data:doc.data()}     
      //     })
      //   } else {
      //     throw new Error;
      //   }  
      // }).catch((error) => {
      //   // var errorCode = error.code;
      //   // var errorMessage = error.message;
      //   // alert(errorCode, errorMessage)
      //   setErrorMsg(error.message+ " Error Code : " +error.code)
      //   handleLogin();
      // });
    }).catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // alert(errorCode, errorMessage)
      setErrorMsg(error.message+ " Error Code : " +error.code)
      handleLogin();
    })
    .finally(()=>{
      setLoading(false) 
    })
  }

  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePassChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    setTypeError(false)
    setType(event.target.value);
  };

  return (
    <div>
   {
     loading === false 
     ? (
        signup===false 
        ? <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate method="POST">
                {/* <FormControl variant="filled" fullWidth > 
                  <InputLabel id="demo-simple-select-filled-label">Login Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={type}
                    onChange={handleChange}
                    error={typeError}
                  >
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Examiner'}>Examiner</MenuItem>
                    <MenuItem value={'Administrator'}>Administrator</MenuItem>
                  </Select>
                </FormControl> */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="User ID"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email} onChange={e=>setEmail(e.target.value)}
                  error={nameError} helperText={nameError?'Enter email':''}
                />
                <FormControl fullWidth 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    required
                    
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handlePassChange('password')}
                    error={passError} helperText={passError?'Enter password':''}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={login}
                >
                  Sign In
                </Button>
                <Grid container>
                  {/* <Grid item xs={12}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Typography align='center'>
                      {"Don\'t have an account? "}
                    </Typography>
                      <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={()=>setSignup(true)}
                      >
                        Sign Up
                      </Button>
                    
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
          
          <Snackbar open={loginFailOpen} autoHideDuration={5000} onClose={handleLoginClose}>
            <MuiAlert onClose={handleLoginClose} severity="error">
              {errorMsg}
            </MuiAlert>
          </Snackbar>
        </Grid>
        : <AddAccount setSignup={setSignup} />
      )
    //  :<Backdrop className={classes.backdrop} open={true} >
    //     <CircularProgress />
    //   </Backdrop>
    : <Loading />
    }
    </div>
  );
}