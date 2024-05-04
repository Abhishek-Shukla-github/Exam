import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline } from '@material-ui/core';
import { auth } from './dbconfig';
import SignInSide from './SignInSide';
import { UserContext } from './App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  box:{
    width: '100%',
    padding: '10px',
    textAlign: 'center'
  }
}));

export default function VeryMsg(props) {
  const classes = useStyles();
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(auth.currentUser)
    const d = new Date()
    console.log((Date.now() - Date.parse(auth.currentUser.metadata.creationTime))/60000 > 2)
  },[])


  const logout=()=>{
    auth.signOut().then(()=>{
        user.action({
            type:"LOGOUT",
            data: null
        })
        props.setContent(<SignInSide />)
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Examnet
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" variant="h5" className={classes.box} >
            Please click on the email verification link sent to your registered email. Then come back here and refresh the page.
        </Typography>
      </Container>
    </div>
  );
}
