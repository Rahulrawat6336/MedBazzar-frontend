import { Grid,Divider,Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import AddAddress from "./AddAddress";
import { useState } from "react";
import { useEffect } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { postData } from "../../../services/FetchNodeService";
import Swal from "sweetalert2";


export default function DeliveryAddress(props){

    var navigate=useNavigate()
 


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleAddress=()=>{
        props?.setStatus(!props?.status)
        
    }
    const handleDelete=async(key)=>{

        // alert(result.status)
        Swal.fire({
            title: "Do you want to delete categoty?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "delete",
            denyButtonText: `Don't delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var result=await postData("users/delete_user_address",{addressid:key})
              if(result.status){
      Swal.fire({toast:true,title:'Deleted !', icon:'success'});
    
    props.setPageRefresh(!props.pageRefresh)
    }
    else{
      Swal.fire({toast:true,title:'Fail to delete RECORD !', icon:'success'});
  
      
    }

            } else if (result.isDenied) {
              Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
            }
          });
        
    }

    useEffect(function(){
        showAllAddress()
       },[])

    
    const showAllAddress=(userAddress)=>{
       
    

        return userAddress?.map((item)=>{
        return  <div style={{display:'flex'}}>
            <label key={userAddress.id}>
       <input
         type="radio"
         name="address"
         value={userAddress.id}
        
       />
       <img src='delete.png' onClick={()=>handleDelete(item?.addressid)}  style={{width:15,height:15,marginLeft:150,cursor:'pointer'}}/>
      
    
    
         
         <div style={{display:'flex',flexDirection:'column',padding:10,margin:10}}>
            {/* <DeleteForeverOutlinedIcon onClick={()=>handleDelete(item?.addressid)}  style={{marginLeft:'auto',cursor:'pointer'}}/> */}
              
        <div>{item?.address}</div>
        <div>{item?.landmark}</div>
        <div>{item?.state},{item?.city} {item?.pincode}</div>
        </div>
        </label>
        
        </div>

        })
    }


   

       


    return(<div style={{display:'flex',width:'50%',border:'solid 1px #00000021',height:'auto',borderRadius:15,padding:10,fontFamily:'kanit',marginTop:40}}>
<Grid container spacing ={3}>

    <Grid item xs={12} style={{ display:'flex',fontSize:16,fontWeight:'bolder',alignItems:'center',justifyContent:'center'}}>
        Dilevery Address

        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'auto'}}>
       

       <Button onClick={handleAddress} startIcon={<AddIcon/>} size="small" variant="contained" style={{display:'flex',borderRadius:30,padding:matches?<></>:10,marginLeft:matches?<></>:'auto',fontFamily:'kanit',fontSize:'.8vw',fontWeight:'bolder',justifyContent:'center',alignItems:'center',marginBottom:10,width:'9vw',height:'4vh'}}>
        Add Address
      
       </Button>
      

   </div>
    </Grid>

    <Grid item xs={12} >
    <Divider />
    </Grid>

    <Grid item md={6} xs={12}  style={{fontSize:matches?10:13,fontWeight:'bolder',alignItems:'center',display:'flex',justifyContent:matches?'center':<></>}}>
        { props?.userAddress?.length==0?<span>
     Please add your address to continue</span>:<div>
        <div>{props?.userData?.username}</div>
        {showAllAddress(props?.userAddress)}
     </div>}
    </Grid>

  



</Grid>

    </div>)
}