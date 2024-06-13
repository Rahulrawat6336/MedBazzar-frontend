import { Button, Divider, Grid } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { generatePath, useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import { postData, serverURL } from "../../../services/FetchNodeService";
import { useDispatch } from "react-redux";

export default function PaymentDetail(props){

  var navigate=useNavigate()
  var dispatch=useDispatch()

   const [caption,setCaption]=useState('Login to proceed')

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));


  var productFromRedux=props?.product
  var productdetail=Object.values(productFromRedux)
  var keys=Object?.keys(productFromRedux)

  var totalamount= productdetail.reduce((p1,p2)=>{
    var amt= p2.qty*p2.price
    return p1+amt
        },0)


        var amountpaid= productdetail.reduce((p1,p2)=>{
          var amt= p2.qty*(p2.offerprice>0?p2.offerprice:p2.price)
          return p1+amt
              },0)

              var save=totalamount-amountpaid 


              useEffect(function(){
                if(props?.userAddress.length>0){
                  setCaption('MAKE PAYMENT')
                }
              },[props.userAddress])


       var generateOrder=async(razorpay_payment_id,)=>{

        var body={userid:props?.userData?.userid,mobileno:props?.userData?.mobileno,emailid:props?.userData?.emailid,paymentstatus:'online',paymentid:razorpay_payment_id,orderlist:productdetail,}

        var result=await postData('users/save_orders',body )
        alert(result.status)
        if(result.status){
          // dispatch({type:'ADD_ORDER',payload:[body]})
        }
       }       



 ///********Payment Gateway********** */


  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: amountpaid*100, //  = INR 1
    name: "MedBazzar",
    description: 'some description',
    image:
      `${serverURL}/images/logo.png`,
    handler: function (response) {
        generateOrder(response.razorpay_payment_id)
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: props?.userData?.username,
      contact: props?.userData?.mobileno,
      email: props?.userData?.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  ////********************* */


  const handleLogin=()=>{
    if(caption.toUpperCase()==="MAKE PAYMENT")
    openPayModal()
    else
    navigate("/loginscreen")

  }



  

  var gift=<div style={{width:'100%'}}> <Divider style={{marginTop:matches?'6%':'-5%',height:matches?.5:1.5,background:'#95a5a6',opacity:'0.5',zIndex:2}}/>
            <div style={{fontWeight:"bold",fontSize:16,marginTop:'4%',marginLeft:'3%', display:'flex',alignItems:'center'}}>
        <LocalOfferOutlinedIcon/>
        <span style={{marginLeft:'2%',}}>Use Coupons<br/>
        <span style={{fontSize:10,fontWeight:"lighter",whiteSpace:'nowrap'}}>Also get a gift code after pacing this oder</span>
        </span>
        <span style={{marginLeft:'auto'}}><ArrowForwardIosOutlinedIcon/></span>
        </div>
        <Divider style={{marginTop:matches?'4%':'4%',height:matches?.5:1.5,background:'#95a5a6',opacity:'0.5',zIndex:2}}/>
        </div>



 


    return( 
      <Grid container spacing={2} style={{display:'flex',position:'relative',height:'auto',fontFamily:'kanit',width:matches?'80%':'100%',flexDirection:'column',marginLeft:matches?'10%':'2%',}}>



               <Grid item xs={12} style={{}}>
                 <div style={{color:'#191D23',fontWeight:'bold',fontSize:'120%',marginTop:matches?'0%':'5%'}}>Payment Details</div>

                 <Grid item xs={12} style={{marginTop:'5%'}}>
   
                    <Grid item xs={6} style={{fontSize:18,display:'flex',position:'absolute',}} >
                    Total Amount
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center',marginBottom:'%',marginLeft:'auto',position:'relative'}} >
                    &#8377;{totalamount}
                    </Grid>

                    </Grid>

                    <Grid item xs={12} style={{marginTop:'3%'}}>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',position:'absolute',}} >
                       Amount Paid
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center',marginLeft:'auto',position:'relative',}} >
                    &#8377;{amountpaid}
                    </Grid>

                    </Grid>

                    <Grid item xs={12} style={{marginTop:'3%'}}>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',position:'absolute',}} >
                      Savings
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'flex-end',alignItems:'center',marginLeft:'auto',position:'relative',}} >
                        &#8377;{save}
                    </Grid>

                    </Grid>
    
    <div style={{display:'block',fontWeight:'bold',width:'94%',background:'yellow',borderRadius:10,padding:'0.8em',fontSize:16,marginTop:'8%',justifyContent:'space-between',display:'flex',whiteSpace:'nowrap'}}>Order Total <span style={{fontWeight:'bold',fontSize:16,marginLeft:'60%'}}>&#8377;{amountpaid}</span></div>
    <div style={{fontWeight:'lighter',fontSize:13,marginTop:'3%',marginLeft:'3%'}}>Price may vary depending on the product batch*</div>
    </Grid>
    {matches?gift:''}
       
        <div style={{display:'flex',flexDirection:'column',width:'95%',border:matches?"1px solid #dfe6e9":'',borderRadius:10,height:90,marginTop:matches?'4%':'3%'}}>
        {matches? <div style={{display:'flex',justifyContent:'space-between',width:'100%',background:"#dfe6e9",border:"1px solid #dfe6e9",height:30,}}>
            <FormControlLabel  control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel  control={<Radio />} label="Make Payment" />
             </div>:<></>}
            {matches? <div style={{marginLeft:'5%',marginTop:'2%',display:'flex',flexDirection:'row'}}>
                <span style={{fontWeight:'lighter',fontSize:13}}>{keys?.length}ITEM <br/><span style={{fontWeight:'bold',fontSize:13}}>&#8377;{amountpaid}</span></span>
                <span style={{marginLeft:'40%'}}><Button onClick={handleLogin} style={{background:'#00391C',height:'90%',whiteSpace:'nowrap'}} variant="contained" fullWidth>{caption}</Button></span>
             </div>:<></>}


             <Divider style={{marginTop:matches?'6%':'4%',height:matches?.5:1.5,background:'#95a5a6',opacity:'0.5',zIndex:2}}/>
    <div style={{fontWeight:"bold",width:'100%',fontSize:16,marginTop:'5%',marginLeft:'3%',flexDirection:'column', display:'flex'}}>
    <span style={{marginLeft:'',}}>Delivery instructions </span><br/>
      <div style={{flexDirection:'row', display:'flex',alignItems:'center'}}>
        <TwoWheelerOutlinedIcon/>
        <span style={{marginLeft:'2%',whiteSpace:'nowrap'}}>Add pickup instructions </span>
        <span style={{marginLeft:'auto'}}><ArrowForwardIosOutlinedIcon/></span>
        </div>
        </div>
        <Divider style={{marginTop:matches?'6%':'4%',height:matches?.5:1.5,background:'#95a5a6',opacity:'0.5',zIndex:2}}/>

       </div> 

    </Grid>)
}