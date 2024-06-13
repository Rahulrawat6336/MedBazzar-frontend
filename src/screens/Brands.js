import { Avatar, Button, Grid, TextField } from "@mui/material"
import { useStyles } from "./BrandsCss"
import TitleComponent from "../components/admin/TitleComponent"
import { useState } from "react"
import { postData } from "../services/FetchNodeService"
import Swal from "sweetalert2"

export default function Brands(){

     var classes=useStyles()

    const [picture,setPicture]=useState({file:'logo.webp',bytes:''})
    const [brand,setBrand]=useState('')
    const [error,setError]=useState({})

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit=async()=>{
        var submit=true
        if(brand.length==0){
            handleError('brand','pls input brand name...')
            submit=false
        }
        if(picture.bytes.length==0)
        {
         handleError('picture','Pls choose icon...')
         submit=false
        }
        if(submit){
            var formData= new FormData()
            formData.append('brandname',brand)
            formData.append('brandicon',picture.bytes)
            var result = await postData('brand/submit_brand',formData)
    
            console.log(result)
            if(result.status){
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer: 1500,
                    toast:true   
                  });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer: 1500  
                  });
            }

        }
    }

    const handleReset=()=>{
        setBrand('')
        setPicture({file:'logo.webp',bytes:''})
    }

    function handlePicture(event){
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
   
    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TitleComponent title='Add New Brand' logo='logo.png' listicon='list.png' page='/admindashboard/displayallbrand' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={error.brand} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.brand}</span>} onFocus={()=>handleError('brand',null)} onChange={(event)=>setBrand(event.target.value)} label='brand Name' value={brand} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' component='label' fullWidth>
                            Upload
                            <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                            
                        </Button>
                        {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
                    </Grid>
                    <Grid item xs={6}  style={{display:'flex',justifyContent:'center'}}>
                        <Avatar 
                         src={picture.file} variant="rounded" ></Avatar>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}