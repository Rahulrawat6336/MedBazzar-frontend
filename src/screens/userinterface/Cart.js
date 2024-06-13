import { Grid } from "@mui/material";
import CartList from "../../components/admin/userinterface/CartList";
import Header from "../../components/admin/userinterface/Header";
import MenuBar from "../../components/admin/userinterface/MenuBar";
import PaymentDetail from "../../components/admin/userinterface/PaymentDetail";
import FooterComponent from "../../components/admin/userinterface/FooterComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postData } from "../../services/FetchNodeService";
import AddAddress from "../../components/admin/userinterface/AddAddress";
import DeliveryAddress from "../../components/admin/userinterface/DeliveryAddress";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Cart(props){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [pageRefresh,setPageRefresh]=useState(false)
    const [status,setStatus]=useState(false)
    const [userAddress,setUserAddress]=useState([])
    const [statusDelivery,setStatusDelivery]=useState(false)

     var product=useSelector((state)=>state.data)
     var userData =Object.values(useSelector((state)=>state.user))[0]
    // const userData = JSON.parse(localStorage.getItem('ADMIN'));

    

     console.log ('user Dataaa',userData)

     const check_user_address=async()=>{
        
        if(userData?.mobileno== undefined)
        { setStatus(false)}
        else{
         var result=await postData('users/check_user_address',{mobileno:userData?.mobileno})
         if(result.status==false)
         {
             setStatus(true) 
             setStatusDelivery(true)
         }
         else
         {
             setStatus(false)
             setUserAddress(result.data)
             setStatusDelivery(true)
            
            
         }
     }
       }


    useEffect(function(){
     check_user_address()
    },[userData?.mobileno,pageRefresh])



    return(<Grid container spacing={3} style={{display:'flex',position:'relative',flexDirection:matches? 'row' :'column' ,fontFamily:'kanit',width:'auto',height:'auto',}}>
        {matches?<Grid item xs={12} >
            <Header/>
            <MenuBar/>
        </Grid>:<></>}
        {matches?<></>:
    <div style={{ position: 'sticky', top: 0, zIndex: 1, width:"100%", height: 40, background: 'white', justifyContent:'center',alignItems:'center'}}>
        <div style={{marginLeft:''}}>
            <span style={{marginLeft:'8%',justifyContent:'center',alignItems:'center'}}><ArrowBackOutlinedIcon/></span>
            <span style={{fontSize:20,fontWeight:'bold',marginLeft:'3%'}}>My Cart</span> 
        </div>
    </div>
}
        
        <Grid item xs={matches?8:12} style={{marginTop:'1%',minHeight:matches?600:''}}>
        {statusDelivery ? <DeliveryAddress pageRefresh={pageRefresh} status={status}  setStatus={setStatus} setPageRefresh={setPageRefresh} userData={userData} userAddress={userAddress} /> : <></>}
            <CartList statusDelivery={statusDelivery}  userAddress={userAddress} userData={userData} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} product={product}/>
        </Grid>
        <Grid item xs={matches?4:12} style={{marginTop:'3%'}}>
            <PaymentDetail product={product} userAddress={userAddress} userData={userData}/>
        </Grid>
      {matches?  <Grid item xs={12} style={{marginTop:'3%'}}>
            <FooterComponent/>
        </Grid> :<div></div>}
        <Grid item xs={12}>
        <AddAddress pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} status={status} setStatus={setStatus}/>
        </Grid>
    </Grid>)
}