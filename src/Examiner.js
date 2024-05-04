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
import Profile from './examinerjobs/Profile';
import Password from './examinerjobs/Password';
import CreatePaper from './examinerjobs/CreatePaper'
import TodayIcon from '@material-ui/icons/Today';
import BallotIcon from '@material-ui/icons/Ballot';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { UserContext } from './App';
import { Avatar, Badge, Menu, MenuItem } from '@material-ui/core';
import SignInSide from './SignInSide';
import db,{ auth } from './dbconfig';
import { collection, query, where, getDocs, onSnapshot, doc } from "firebase/firestore";
import PaperCheck from './examinerjobs/PaperCheck';
import { deepPurple } from '@material-ui/core/colors';

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

export default function Examiner(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [content, setContent] = useState('')
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    // db.collection('notifications').where('user','in',['Examiner', 'All']).onSnapshot((d)=>{
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
    setNotificationAnchorEl(null);
  }

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setDraw(open);
//   };

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
        <ListItem button key={'Create Paper'} onClick={()=>setContent(<CreatePaper />)}>
            <ListItemIcon><BallotIcon /></ListItemIcon>
            <ListItemText primary={'Create Paper'} />
        </ListItem>
         <ListItem button key={'Check Paper'} onClick={()=>setContent(<PaperCheck />)}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={'Check Paper'} />
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
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Profile/>)} }>Profile</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); setContent(<Password/>)} }>Change Password</MenuItem>
      <MenuItem onClick={ ()=>{handleMenuClose(); logout() }}>Logout</MenuItem>
    </Menu>
  );

  const notificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
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
            <IconButton aria-label="new notifications" color="inherit" onClick={(event)=>setNotificationAnchorEl(event.currentTarget)}>
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