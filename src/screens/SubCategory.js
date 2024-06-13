import { Avatar, Button, Grid, TextField } from "@mui/material"
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import { useStyles } from "./BrandsCss"
import TitleComponent from "../components/admin/TitleComponent"
import { useState,useEffect } from "react"
import { postData,getData } from "../services/FetchNodeService"
import Swal from "sweetalert2"

export default function SubCategory(){

     var classes=useStyles()

    const [picture,setPicture]=useState({file:'logo.webp',bytes:''})
    const [subCategory,setSubCategory]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        console.log('DAAATTAAA',result.data)
        if(result.status)
        { setCategoryList(result.data)}
        
        }
        useEffect(function(){
       fetchAllCategory()
    
        },[])

        const fillAllCategory=()=>{
            return categoryList.map((item)=>{
                return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            })
        }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit=async()=>{
        var submit=true
        if(subCategory.length==0){
            handleError('subCategory','pls input brand name...')
            submit=false
        }
        // if(picture.bytes.length==0)
        // {
        //  handleError('picture','Pls choose icon...')
        //  submit=false
        // }
        if(submit){
            var formData= new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategory)
            formData.append('icon',picture.bytes)
            var result = await postData('subcategory/submit_subcategory',formData)
    
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
        setSubCategory('')
        setCategoryId('')
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
                        <TitleComponent title='Add New SubCategory' logo='logo.png' listicon='list.png' page='/admindashboard/displayallsubcategory'/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label='Category' onChange={(event)=>setCategoryId(event.target.value)} value={categoryId}>
                               {fillAllCategory()}
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={error.subCategory} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.subCategory}</span>} onFocus={()=>handleError('brand',null)} onChange={(event)=>setSubCategory(event.target.value)} label='subcategory name' value={subCategory} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' component='label' fullWidth>
                            Upload
                            <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                            
                        </Button>
                        {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
                    </Grid>
                    <Grid item xs={6}  style={{display:'flex',justifyContent:'center'}}>
                        <Avatar alt="Remy sharp" src={picture.file} variant="rounded" ></Avatar>
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