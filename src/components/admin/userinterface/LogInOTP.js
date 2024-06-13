import { Grid, Paper,Input, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {postData} from "../../../services/FetchNodeService"
import GetOTP from "./GetOTP";
import LogInDetail from "./LogInDetail";
import { useDispatch } from "react-redux";

export default function LogInOTP(props){

  var navigate=useNavigate()
  var dispatch=useDispatch()

  const [mobileno,setMobileno]=useState('')
  const[status,setStatus]=useState(true)
  const[otp,setOtp]=useState('')
  const[userStatus,setUserStatus]=useState(true)
  const [userData,setUserData]=useState([])

  var generateOTP=()=>{
  
    var myotp=parseInt(Math.random()*8999)+1000
  alert(myotp)
  setOtp(myotp)
   }

  const handleOTP=async()=>{
    var result=await postData('users/check_userdata',{mobileno:mobileno})
    // alert(result.message)
    if(result.status==false)
    { generateOTP()
      setStatus(!status)
      setUserStatus(false)
    }
    else
    {generateOTP()
      setStatus(!status)
     setUserStatus(true)
     setUserData(result.data)
    
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
              Sign in to MedBazzar
            </div>
            <div style={{ fontWeight: "", fontSize: 13 }}>
              to acccess your Addresses, Orders & Whislist
            </div>
                
            </Grid>
            <Grid item xs={12} style={{display:'flex',marginTop:30,alignItems:'center',justifyContent:'center'}}>
            <div style={{ marginRight: 5, fontWeight: "bold" }}>+91</div>
            <Input
              style={{ fontSize: 13, fontWeight: "bold" }}
              id="standard-basic"
              variant="standard"
              placeholder="Enter Your Mobile No"
              fullWidth
              onChange={(event)=>setMobileno(event.target.value)}
              
              />
            </Grid>
            <Grid item xs={12} style={{marginTop:80}}>
                <Button
                onClick={handleOTP}
                 
                  variant="contained"
              fullWidth>
                Get OTP
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
    </Paper>:userStatus?<GetOTP mobileno={mobileno} otp={otp} userData={userData}/>:<LogInDetail mobileno={mobileno} otp={otp}/>}
    </div>)
}