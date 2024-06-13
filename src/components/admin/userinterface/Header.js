import { AppBar, Box, Toolbar, Button, IconButton, Badge } from "@mui/material";
import logo from '../../../assests/logo.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../../services/FetchNodeService"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStyles } from "../../../screens/userinterface/homeCss";
import { useSelector } from "react-redux";
import ShowCartProduct from "./ShowCartProduct";
import ShowUserDetail from "./ShowUserDetail";

export default function Header(props) {
  var classes = useStyles()
  var navigate = useNavigate()
  var userMenu = useRef(null)

  const [pattern, setPattern] = useState('')


  var products = useSelector((state) => state.data)
  var user = useSelector((state) => state.user)
  var keys = Object?.keys(products)

  var userData = ''
  var userInformation = []
  try {

    userData = Object.values(user)[0]

    userInformation = Object.values(user)[0]



  }
  catch (e) {

  }




  const [status, setStatus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const handleDrawer = () => {
    setStatus(true)
  }
  const handleDrawerClose = () => {
    setStatus(false)
  }

  const showCartDetail = () => {
    setIsOpen(true)

  }
  const hideCartDetail = () => {
    setIsOpen(false)

  }

  const handleUser = (e) => {
    if (userData == undefined) {
      navigate('/loginscreen')
    }
    else {
      setOpen(!open)
    }
  }

  // const handleUser = (e) => {
  //   if ((userMenu.current && !
  //     userMenu.current.contains(e.target))) {
  //     setOpen(false)
  //   }
  //   else {
  //     if (userData == undefined) {
  //       navigate('/loginscreen')
  //     }
  //     else {
  //       setOpen(!open)
  //     }

  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleUser)

  //   return () => {
  //     document.removeEventListener('mousedown', handleUser);
  //   }
  // }, [])



  // const handleGotoFilter=()=>{
  //   navigate('/filterpage',{state:{pattern:pattern}})
  // }

  const handleGotoFilter = () => {
    navigate(`/filterpage/${pattern}`)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/filterpage/${e.target.value}`)
    }
  }





  const drawerList = () => {
    return (<div>

      <Paper >
        <div className={classes.leftBarStyle}>
          <img src={`${serverURL}/images/1.jpg`} style={{ height: 100, width: 100, borderRadius: 50 }} />
          <div className={classes.nameStyle}>{userInformation?.username}</div>
          <div className={classes.emailStyle}>{userInformation?.emailid}</div>
          <div className={classes.phoneStyle}>{userInformation?.mobileno}</div>
        </div>
        <div className={classes.menuStyle}>
          <List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/displayallcategory')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/displayallsubcategory')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>} />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/displayallbrand')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/displayallproduct')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/displayallproductdetail')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admindashboard/banner')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
              </ListItemButton>
            </ListItem>


            <Divider />
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Paper>
    </div>)
  }

  const secondrySearchBar = () => {
    return (
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <AppBar style={{ background: '#fff' }} position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MenuOutlinedIcon onClick={handleDrawer} style={{ color: '#000', fontSize: 30 }} />
            {searchBarComponent()}
            <div style={{ display: 'flex', width: 70, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <PersonOutlineOutlinedIcon ref={userMenu} style={{ color: '#000', fontSize: 30, cursor: 'pointer' }} />
                <div style={{ color: '#000', width: '100%', fontSize: 6, fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{userData?.username}</div>
              </div>

              <PhoneOutlinedIcon style={{ color: '#000', fontSize: 30 }} />
            </div>
          </Toolbar>
        </AppBar>
        <div>
          {/* {`xxxxx${matches}`} */}
        </div>
      </Box>)
  }

  const searchBarComponent = () => {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', margin: 1, display: 'flex', alignItems: 'center', width: '50%' }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products here.."
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={handleGotoFilter} />
        </IconButton>

      </Paper>)
  }


  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }} onMouseLeave={hideCartDetail} >
      <AppBar style={{ background: '#fff' }} position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img onClick={()=>navigate('/home')} src={logo} style={{ width: 150 ,cursor:'pointer'}} />
          {matches ? searchBarComponent() : <div></div>}
          <div style={{ display: 'flex', width: matches ? 110 : 50, justifyContent: 'space-between' }}>
            {matches ?
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                < PersonOutlineOutlinedIcon ref={userMenu} onClick={handleUser} style={{ color: '#000', fontSize: 30, cursor: 'pointer' }} />
                <div style={{ color: '#000', width: '100%', fontSize: 8, fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{
                  userData == undefined ? <div style={{ color: '#64748B', display: 'flex', justifyContent: 'center', fontSize: 12 }}>Login</div> : userData?.username
                }
                </div>
              </div>
              :
              <div></div>
            }
            <Badge badgeContent={keys?.length} color="primary">
              <ShoppingCartOutlinedIcon onMouseOver={showCartDetail} style={{ color: '#000', fontSize: 30 }} />
            </Badge>
            {matches ? < PhoneOutlinedIcon style={{ color: '#000', fontSize: 30 }} /> : <div></div>}
          </div>
        </Toolbar>
      </AppBar>
      <div>
        {!matches ? secondrySearchBar() : <div></div>}

      </div>
      <Drawer
        anchor={'left'}
        open={status}
        onClose={handleDrawerClose}
      >
        <div>{drawerList()}</div>
      </Drawer>
      <ShowCartProduct isOpen={isOpen} />
      <ShowUserDetail open={open}  />
    </Box>
  );
}