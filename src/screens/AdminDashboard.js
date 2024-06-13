import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";

import Brands from "./Brands";
import Categories from "./Categories";
import SubCategory from "./SubCategory";
import DisplayAllBrands from "./DisplayAllBrands";
import DisplayAllCategory from "./DisplayAllCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProductDetails";
import Products from "./Products";
import Banners from "./Banners";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../services/FetchNodeService";
import Concern from "./Concern";

//import Summary from "./Summary";
//import Chart from "../../components/DashboardComponent/Chart";

export default function AdminDashboard(props){
  const classes=useStyles();
  const navigate=useNavigate();

  var adminData=JSON.parse(localStorage.getItem('ADMIN'))
 
 
  
  return(
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="sticky"> 
          <Toolbar variant="dense"> 
            <Typography variant="h6" color="inherit" component="div">
              MedBazzar
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spaces={3} style={{paddingInlineStart:5}} >
          <Grid item xs={2.2} >
            <Paper >
              <div className={classes.leftBarStyle}>
              <img src={`${serverURL}/images/${adminData.picture}`}  style={{height:100,width:100,borderRadius:50}}/>
                <div className={classes.nameStyle}>{adminData.adminname}</div>
                <div className={classes.emailStyle}>{adminData.emailid}</div>
                <div className={classes.phoneStyle}>{adminData.mobileno}</div>
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
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrand') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproduct') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetail') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/banner') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/concern') }>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
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

          </Grid> 
          
          <Grid item xs={9.8} style={{padding:20}}>
           
            <Routes>
              <Route path="/" element={<Navigate to="/admindashboard/Summary" replace={true} />}/>
              <Route element={<Categories/>} path={'/category'} />
               <Route element={<DisplayAllCategory/>} path={'/displayallcategory'} />
             <Route element={<SubCategory/>} path={'/subcategory'} />
             <Route element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'} />
             <Route element={<Brands/>} path={'/brand'} />
              <Route element={<DisplayAllBrands/>} path={'/displayallbrand'} />
             <Route element={<Products/>} path={'/product'} />
             <Route element={<DisplayAllProducts/>} path={'/displayallproduct'} />
             <Route element={<DisplayAllProductDetails/>} path={'/displayallproductdetail'} />
             <Route element={<ProductDetails/>} path={'/productdetail'} />
             <Route element={<Banners/>} path={'/banner'} />
             <Route element={<Concern/>} path={'/concern'} />
            </Routes> 
  
          </Grid>
        </Grid>
        
                 </Box>
  )
}