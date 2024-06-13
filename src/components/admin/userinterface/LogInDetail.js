import { Button, Grid, Paper, TextField } from "@mui/material";
import OtpInput from 'react-otp-input';
import { useState } from "react";
import LogInOTP from "./LogInOTP";
import Swal from "sweetalert2";
import { postData } from "../../../services/FetchNodeService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LogInDetail(props){

    var navigate=useNavigate()
    var dispatch=useDispatch()

    
    const [otp, setOtp] = useState('');
    const [status,setStatus]= useState(true)
    const [emailId,setEmailId]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')

    const handleSubmit=async()=>{
        if(props.otp==otp)
        {
           var body={mobileno:props.mobileno,emailid:emailId,username:(firstName+" "+lastName)}
           var result= await postData('users/submit_user',body)
           if(result.status)
           {
               Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: "You are registered now...",
                   showConfirmButton: false,
                   timer: 1500,
                   toast:true
                 });
                 dispatch({type:'ADD_USER',payload:[props?.mobileno,body]})
                 navigate('/cart')
           }
         

       
        }
        else
        {
           alert("Invalid OTP...")
        }
   
       }




    return(<div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
        {status?
        <Paper elevation={5}  style={{borderRadius:'50px 12px',width:'90%'}}>
            <Grid container spacing={2} style={{ display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          fontFamily: "kanit",}}>
            <Grid item xs={6}>
                <Grid item xs={12} style={{display:'flex',flexDirection:'column'}} >
                    <div style={{fontSize:30,fontWeight:'bold'}}>Welcome To MedBazzar</div>
                    <div style={{fontSize:14,fontWeight:'',marginTop:'1%'}}>please enter your details for better shopping experience</div>
                </Grid>
                <Grid item xs={12}style={{fontSize:10,fontWeight:'bold',marginTop:'5%'}}>
                    <TextField onChange={(event)=>setFirstName(event.target.value)}  placeholder="Enter First Name" variant="standard" fullWidth hiddenLabel ></TextField>
                    <TextField onChange={(event)=>setLastName(event.target.value)}  placeholder="Enter Last Name (optional)" style={{marginTop:'5%'}} variant="standard" fullWidth hiddenLabel ></TextField>
                    <TextField onChange={(event)=>setEmailId(event.target.value)}  placeholder="Enter Email id (optional)" style={{marginTop:'5%'}} variant="standard" fullWidth hiddenLabel ></TextField>
                    </Grid>

                     <Grid item xs={12} style={{display:'flex',marginTop:'5%',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
                    <div style={{fontSize:20,fontWeight:'bold'}}>Verify Phone Number</div>
                    <div style={{fontSize:10,fontWeight:''}}>An SMS with 4-digit OTP was sent to</div>
                </Grid>
                <Grid item xs={12} style={{display:'flex',marginTop:'1%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <span>+91{props.mobileno}</span>
                    <Button onClick={()=>setStatus(!status)}>CHANGE</Button>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',marginTop:'1%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <OtpInput
                 value={otp}
                 onChange={setOtp}
                 numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{width:35,height:40}}
                     />
                      <Button style={{ marginTop: '5%', fontWeight: "bold" }} onClick={handleSubmit} variant="contained" fullWidth>GET STARTED</Button>
                    </Grid>
                    </Grid>                   

            </Grid>

        </Paper>:<LogInOTP/>}
    </div>)
}