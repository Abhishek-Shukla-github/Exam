import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SubjectJob from './adminjobs/SubjectJob';
import { UserContext } from './App';
import { Avatar, Badge, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography, useTheme, withStyles } from '@material-ui/core';
import db, { auth } from './dbconfig';
import { collection, query, where, getDocs, onSnapshot, doc } from "firebase/firestore";
import QuestionPaper from './adminjobs/QuestionPaper';
import TodayIcon from '@material-ui/icons/Today';
import ReceiptIcon from '@material-ui/icons/Receipt';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MenuIcon from '@material-ui/icons/Menu';
import Profile from './adminjobs/Profile';
import Password from './adminjobs/Password';
import SignInSide from './SignInSide';

import DisplayStudents from './adminjobs/DisplayStudents';
import DisplayExaminers from './adminjobs/DisplayExaminers';
import ShowPapers from './adminjobs/ShowPapers';
import { deepPurple, indigo } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },

  sectionDesktop: {
    display: 'flex',
  },

  MuiMenuItem : {
    width: '300px',
    fontSize: '0.83rem',
    minHeight: '48px',
    lineHeight: 1.5,
    whiteSpace: 'break-spaces'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[400]),
    backgroundColor: deepPurple[400],
  },

}));


export default function Admin(props){
    const classes = useStyles();
    const user = useContext(UserContext);
    const [value, setValue] = useState(0);
    const [students, setStudents] = useState([]);
    const [examiners, setExaminers] = useState([]);
    const [courses, setCourses] = useState([])
    const [courseData, setCourseData] = useState([])
    const [content, setContent] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const isMenuOpen = Boolean(anchorEl);
    const isNotificationOpen = Boolean(anchorE2);
    const theme = useTheme();

    const getStudents=()=>{
      getDocs(query(collection(db, "users"), where("usertype", "==", "Student")))
      .then((data)=>{
        var d = []
        data.docs.forEach(element => {
          //console.log(element.data())
          d.push(element.data())
        });
        setStudents(d)
      })
    }

    const getExaminers=()=>{
      getDocs(query(collection(db, "users"), where("usertype", "==", "Examiner")))
      .then((data)=>{
        var d = []
        data.docs.forEach(element => {
          //console.log(element.data())
          d.push(element.data())
        });
        setExaminers(d)
      })
    }

    useEffect(()=>{
      let q = query(collection(db, "notifications"), where('user','in',['Administrator', 'All']))
      onSnapshot(q, (querySnapshot) => {
        let data=[]
        const today = new Date()
        querySnapshot.forEach((ele) => {
          if(ele.data().expiry.toDate() > today)
            data.push({...ele.data(), ref: ele.ref})
        });
        setNotifications(data);
      });

      q = query(collection(db, "questions"))
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((ele) => {
          if(Object.keys(ele.data()).filter((key)=>key=='keep').length==0){
            console.log(ele.data())
            setCourses(ids=>[...ids, ele.id])
            setCourseData((data)=>[...data, ele])
          }
        });
      });

      getStudents();
      getExaminers();

    },[])

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleNotificationClose = () => {
      setAnchorE2(null);
    }

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const logout=()=>{
      auth.signOut().then(()=>{
        props.setContent(<SignInSide />)
        user.action({
          type:"LOGOUT",
          data: null
        })
        
        // handleMenuClose()
      })
    }

    const makeSeen=(index)=>{
      if(!notifications[index].seen){
        notifications[index].ref.update({
          seen:true
        })
        setNotifications((arr)=>{arr[index].seen = true; return arr})
      }
    }
    
    const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        
        {/* <ListItem button key={'Subjects'} onClick={()=>setContent(<SubjectJob courses={courses} setCourses={setCourses}/>)}> */}
        <ListItem button key={'Subjects'} onClick={()=>setContent(<SubjectJob />)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Subjects'} />
        </ListItem>
        <ListItem button key={'Exam Papers'} onClick={()=>setContent(<QuestionPaper courseData={courseData} setCourseData={setCourseData} courses={courses} setCourses = {setCourses} />)}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary={'Exam Papers'} />
        </ListItem>
        <ListItem button key={'Students'} onClick={()=>setContent(<DisplayStudents rows={students}/>)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Students'} />
        </ListItem>
        <ListItem button key={'Examiners'} onClick={()=>setContent(<DisplayExaminers rows={examiners}/>)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Examiners'} />
        </ListItem>
        <ListItem button key={'Show Papers'} onClick={()=>setContent(<ShowPapers courseData={courseData}/>)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Show Papers'} />
        </ListItem>
      </List>
    </div>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Profile />)} }>Profile</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Password />)} }>Change Password</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); logout() }}>Logout</MenuItem>
    </Menu>
  );
  const notificationMenu = (
    <Menu
      anchorEl={anchorE2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='notificationmenu'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      {/* <MenuItem className={classes.menu}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
      </MenuItem>
      <Divider/> */}
      {
        notifications.length!=0
        ?
          notifications.map((ele, index)=><MenuItem key={index} className={classes.MuiMenuItem} style={{fontWeight:ele.seen?'200':'400'}} onClick={()=>makeSeen(index)}>{ele.msg}</MenuItem>)
        :
          <MenuItem className={classes.MuiMenuItem} style={{fontWeight:'600'}}>No new notification</MenuItem>
      }
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="secondary">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton aria-label="show 11 new notifications" color="inherit">
  //         <Badge badgeContent={11} color="secondary">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <Avatar>{user.currentUser.data.name.charAt(0)}</Avatar>
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Examnet
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="new notifications" color="inherit" onClick={(event)=>setAnchorE2(event.currentTarget)}>
              <Badge badgeContent={notifications.filter(ele=>ele.seen==false).length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.purple}>{user.currentUser.data.name.charAt(0)}</Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {notificationMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          content!=='' ? content : ''
        }
      </main>
    </div>
    );
}