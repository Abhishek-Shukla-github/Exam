import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AttendExam from './studentjobs/AttendExam';
import Reports from './studentjobs/Reports';
import Profile from './studentjobs/Profile';
import Password from './studentjobs/Password';
import ExamTime from './studentjobs/ExamTime'
import db, { auth } from './dbconfig';
import TodayIcon from '@material-ui/icons/Today';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import BallotIcon from '@material-ui/icons/Ballot';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { UserContext } from './App';
import { Avatar, Badge, Menu, MenuItem } from '@material-ui/core';
import SignInSide from './SignInSide';
import { deepPurple } from '@material-ui/core/colors';
import { doc,query, getDoc,collection,where,onSnapshot  } from "firebase/firestore";

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
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
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
  // sectionDesktop: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  sectionDesktop: {
    display: 'flex',
  },
  // sectionMobile: {
  //   display: 'flex',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },
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

export default function Student(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [draw, setDraw] = useState(false)
  const [content, setContent] = useState('')
  const [timeTable, setTimeTable] = useState('')
  const [examTime, setExamTime] = useState('')
  const [examPaper, setExamPaper] = useState('')
  const [anchorE2, setAnchorE2] = useState(null);
  const isNotificationOpen = Boolean(anchorE2);
  const [notifications, setNotifications] = useState([]);


  useEffect(()=>{
    console.log(user)
    // db.collection('time_table').doc(user.currentUser.data.course).get().then((doc)=>{
    //   // console.log(doc.data()[user.currentUser.data.sem])
    //   setTimeTable(doc.data()[user.currentUser.data.sem])
    // })

    // db.collection('notifications').where('user','in',['Student', 'All']).onSnapshot((d)=>{
    //   // console.log(d.docs)
    //   let data=[]
    //   const today = new Date()
    //   d.docs.forEach((ele)=>{
    //     // console.log(ele.data().expiry.toDate() > today)
    //     if(ele.data().expiry.toDate() > today)
    //       data.push({...ele.data(), ref: ele.ref})
    //   })
    //   setNotifications(data);
    // })

    onSnapshot(
      query(collection(db,'notifications'), where('user', 'in', ['Student', 'All'])),
      (querySnapshot)=>{
        let data=[]
        const today = new Date()
        querySnapshot.forEach((ele)=>{
              if(ele.data().expiry.toDate() > today)
                data.push({...ele.data(), ref: ele.ref})
            })
          setNotifications(data);
      }
    )
    

    // db.collection('exam').doc(user.currentUser.data.course).get().then((doc)=>{
    //   console.log(doc.data())
    //   if(doc.exists && Object.keys(doc.data()).length!=0)
    //     setExamTime(doc.data()[user.currentUser.data.sem]['Y'+new Date().getFullYear()])
    // })

    getDoc(doc(db, "exam", user.currentUser.data.course))
    .then((doc)=>{
      console.log(doc.data())
      if(doc.exists() && Object.keys(doc.data()).length!=0)
        setExamTime(doc.data()[user.currentUser.data.sem]['Y'+new Date().getFullYear()])
    })
    

    // db.collection('questions').doc(user.currentUser.data.course).get().then((doc)=>{
    //   // console.log(Object.keys(doc.data()).length)
    //   // console.log(doc.data()["Y"+new Date().getFullYear()][user.currentUser.data.sem])
    //   if(Object.keys(doc.data()).length != 0)
    //     setExamPaper(doc.data()["Y"+new Date().getFullYear()][user.currentUser.data.sem])
    //     // console.log(doc.data()["Y"+new Date().getFullYear()][user.currentUser.data.sem])
    // })
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

  // const handleNotificationClose = () => {
  //   setAnchorE2(null);
  // }

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // const toggleDrawer = (open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setDraw(open);
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

  const handleNotificationClose = () => {
    setAnchorE2(null);
  }
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        {/* <ListItem button key={'Time Table'} onClick={()=>setContent(<TimeTable timeTable={timeTable}/>)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Time Table'} />
        </ListItem> */}
        <ListItem button key={'Exam Time Table'} onClick={()=>setContent(<ExamTime examTime={examTime}/>)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Exam Time Table'} />
        </ListItem>
        {/* <ListItem button key={'Hall Ticket'} onClick={()=>setContent(<HallTicket/>)}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary={'Hall Ticket'} />
        </ListItem> */}
        <ListItem button key={'Attend Exam'} onClick={()=>setContent(<AttendExam examTime={examTime}/>)}>
            <ListItemIcon><BallotIcon /></ListItemIcon>
            <ListItemText primary={'Attend Exam'} />
        </ListItem>
        <ListItem button key={'Reports'} onClick={()=>setContent(<Reports/>)}>
            <ListItemIcon><CardMembershipIcon /></ListItemIcon>
            <ListItemText primary={'Reports'} />
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
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
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Profile/>)} }>Profile</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Password/>)} }>Change Password</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); logout() }}>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';

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
          notifications.map((ele, index)=><div><MenuItem key={index} className={classes.MuiMenuItem} style={{fontWeight:ele.seen?'200':'400'}} onClick={()=>makeSeen(index)}>{ele.msg}</MenuItem> <Divider /></div>)
        :
          <MenuItem className={classes.MuiMenuItem} style={{fontWeight:'600'}}>No new notification</MenuItem>
      }
    </Menu>
  );

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
  //         {/* <Avatar>{user.data.name.charAt(0)}</Avatar> */}
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
          {/* <div className={classes.sectionDesktop}> */}
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
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