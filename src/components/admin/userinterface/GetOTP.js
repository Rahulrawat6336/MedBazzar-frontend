import { Grid, Paper,Input, Button } from "@mui/material";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import LogInOTP from "./LogInOTP";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



export default function GetOTP(props){

  var navigate = useNavigate()
  var dispatch=useDispatch()

    const [otp, setOtp] = useState('');
    const [status,setStatus]= useState(true)

    const handleVerifyOtp=()=>{
      if(otp==props.otp)
      {
        dispatch({type:'ADD_USER',payload:[props?.mobileno,props?.userData]})
        navigate('/cart')
        // dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
      }
      else
      {
       alert("Invalid otp.....")
      }
   
     }


    return(
    
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
        {status?
         <Paper elevation={5} style={{width:'90%',borderRadius:'60px 12px'}}>
    <Grid container spacing={2} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          fontFamily: "kanit",
        }}>
          
        <Grid item xs={6}>
           <Grid item xs={12} fullWidth>
           <div style={{ fontWeight: "bold", fontSize: 30, marginBottom: 5 }}>
           Verify Phone Number
          
            </div>
            <div style={{ fontWeight: "bold", fontSize: 13 }}>
            An SMS with 6-digit OTP was sent to
            </div>
            <Grid item xs={12}>
            <span style={{ fontWeight: "bold", fontSize: 13 }}>+91{props.mobileno}</span>
            <Button onClick={()=>setStatus(!status)}>Change</Button>

            </Grid>
                
            </Grid>
            <Grid item xs={12} style={{display:'flex',flexDirection:'column',marginTop:30,alignItems:'start',justifyContent:'flex-start'}}>
            
            <OtpInput
                 value={otp}
                 onChange={setOtp}
                 numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{width:35,height:40}}
                     />
         <Button style={{ marginRight: 5, fontWeight: "bold" }}>Resend OTP</Button>
            </Grid>
            <Grid item xs={12} style={{marginTop:80}}>
                <Button
                  onClick={handleVerifyOtp} 
                variant="contained"
                fullWidth >
                Verify
                </Button>
            </Grid>
            <Grid item xs={12}>
            <p style={{ fontSize: 14, marginTop: 30 }}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>

        </Grid>

    </Grid>
    
    </Paper>
             :<LogInOTP/>}
    </div>)
}