import { useState} from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { postData } from '../../../services/FetchNodeService';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AddAddress(props) {

    var navigate=useNavigate()
   
    const [addressOne,setAddressOne]=useState('')
    const [addressTwo,setAddressTwo]=useState('')
    const [landmark,setLandmark]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [pincode,setPincode]=useState('')
  

    const handleClose=()=>{
        // alert('hi')
        props?.setStatus(false)
        // props?.setPageRefresh(!props?.pageRefresh)
    }

    const handleSubmit=async()=>{

        var body={landmark:landmark,state:state,city:city,pincode:pincode,address:(addressOne+" "+addressTwo),mobileno:props?.userData?.mobileno}
        var result=await postData('users/submit_user_address',body)
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
              
              props?.setStatus(false)
              

            
            }
            else{alert("Fail")}
            props.setPageRefresh(!props.pageRefresh)
    }

   


  const drawerList = () => (
   
        <Grid container spacing={2} style={{width:400,display:'flex',marginTop:'3%',marginLeft:'1%',fontFamily:'kanit'}}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'space-between'}}>
               <span style={{fontWeight:'bold',fontSize:25}}> Add Address</span> 
               <span style={{marginLeft:''}}><CloseIcon style={{cursor:'pointer'}} onClick={handleClose}/></span>
            </Grid>
            <Grid item xs={12}>
                {props?.userData?.username} Enter your address details
            </Grid>
            <List>
                <ListItem>
                    <ListItemText>
                <TextField onChange={(e)=>setAddressOne(e.target.value)} variant='standard' label="Full Address " style={{width:'90%'}} fullWidth/>
                </ListItemText>
                </ListItem>
            
                <ListItem>
                    <ListItemText>
                <TextField onChange={(e)=>setAddressTwo(e.target.value)} variant='standard' label="" style={{width:'90%',marginTop:'-1%'}} fullWidth/>
                </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                <TextField onChange={(e)=>setLandmark(e.target.value)} variant='standard'  label='Landmark' style={{width:'90%'}}fullWidth />
                </ListItemText>
                </ListItem>
            
            <ListItem>
                    <ListItemText>
                <TextField onChange={(e)=>setPincode(e.target.value)} variant='standard'  label='Pincode'style={{width:'90%'}}fullWidth />
                </ListItemText>
                </ListItem>
            
            <ListItem>
                    <ListItemText style={{display:'flex',flexDirection:'row'}}>
                    <TextField onChange={(e)=>setState(e.target.value)} label="State" variant="standard"  style={{width:'41%',marginRight: '5%'}}/>
                    <TextField onChange={(e)=>setCity(e.target.value)} label="City" variant="standard" style={{width:'45%'}}/>
                </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemText>
                <Button variant='contained' onClick={handleSubmit}  style={{ fontSize: 12, background: '#006266', marginTop: 10, borderRadius: 20,width:'90%' }}fullWidth>Save & Proceed</Button>
                </ListItemText>
                </ListItem>
            
            
            </List>
        </Grid>
  );

  return (
    <div>
     
          <Drawer
            anchor={'right'}
            open={props.status}
            onClose={handleClose}
          >
            {drawerList()}
          </Drawer>
    </div>
  );
}
