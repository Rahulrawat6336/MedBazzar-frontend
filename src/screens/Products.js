import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useStyles } from "./ProductsCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useState,useEffect } from "react";
import { postData,getData } from "../services/FetchNodeService";
import Swal from "sweetalert2";
export default function Products(){

    var classes=useStyles()

    const [picture,setPicture] =useState({File:'logo.webp',bytes:''})
    const [product,setProduct]=useState('')
    const [description,setDescription] =useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
   

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


        const fetchAllBrand=async()=>{
            var result=await getData('brand/display_all_brand')
            console.log('DAAATTAAA',result.data)
            if(result.status)
            { setBrandList(result.data)}
            
            }
            useEffect(function(){
           fetchAllBrand()
        
            },[])
    
            const fillAllBrand=()=>{
                return brandList.map((item)=>{
                    return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
                })
            }



            const handleCategoryChange=(event)=>{
                setCategoryId(event.target.value)
                fetchAllSubCategory(event.target.value)
            }

            const fetchAllSubCategory=async(cid)=>{

                var result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
                setSubCategoryList(result.data)
            }
            useEffect(function(){
                fetchAllSubCategory()
             
                 },[])

            const fillAllSubCategory=()=>{
                return subCategoryList.map((item)=>{
                    return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                })
            }






    const handleError=(label,msg)=>{
        setError((prev)=>
            ({...prev,[label]:msg})
        )
    }

    const handleSubmit=async()=>{
        var submit=true
        if(product.length==0){
            handleError('product','pls input product name..')
            submit=false
        }
        if(description.length==0){
            handleError('description','pls input description name..')
            submit=false
        }
        if(picture.bytes.length==0)
        {
         handleError('picture','Pls choose icon...')
         submit=false
        }
        if(submit){
           var formData= new FormData()
           formData.append('categoryid',categoryId)
           formData.append('subcategoryid',subCategoryId)
           formData.append('brandid',brandId)
           formData.append('productname',product)
           formData.append('description',description)
           formData.append('picture',picture.bytes)
           var result= await postData('product/submit_product',formData)

           if(result.status){
            Swal.fire({
                icon:'success',
                title:result.message,
                timer:1200,
                toast:true
            });
           }
           else{
            Swal.fire({
                icon:'error',
                title:result.message,
                timer:1200,
                toast:true
            })
           }
        }
    }

    const handlePicture=(event)=>{
        setPicture({File:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TitleComponent  title='Add New Product' logo='logo.png' listicon='list.png' page='/admindashboard/displayallproduct' />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label='Category'  onChange={handleCategoryChange}     value={categoryId} >
                               {fillAllCategory()} 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory</InputLabel>
                            <Select label='SubCategory' onChange={(event)=>setSubCategoryId(event.target.value)}  value={subCategoryId}>
                               {fillAllSubCategory()} 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select label='Brand' onChange={(event)=>setBrandId(event.target.value)}  value={brandId}>
                               {fillAllBrand()} 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={error.product} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.product}</span>} onFocus={()=>handleError('product',null)} onChange={(event)=>setProduct(event.target.value)}  label='Product Name' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField error={error.description} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.description}</span>} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)}  label='Description' fullWidth />
               </Grid>
               <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
               </Grid>
               <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy sharp" src={picture.File} variant="rounded"></Avatar>
               </Grid>
               <Grid item xs={6}>
                <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
               </Grid>
               <Grid item xs={6}>
                <Button variant="contained" fullWidth>Reset</Button>
               </Grid>
                </Grid>
                </div>
        </div>
    )
}