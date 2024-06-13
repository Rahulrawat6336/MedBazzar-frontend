import TitleComponent from "../components/admin/TitleComponent";
import { Avatar, Button, Grid, MenuItem, TextField } from "@mui/material"
import { useStyles } from "./ProductDetailsCss"
import {FormControl,InputLabel,Select} from '@mui/material'
import { useState,useEffect } from "react";
import { getData, postData } from "../services/FetchNodeService";
import Swal from "sweetalert2";
import { useMemo } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(){

    var classes=useStyles()

    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link","video",],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
        //   handlers: {
        //     image: imageHandler
        //   }
        },
      }), [])

    const [picture,setPicture] =useState({file:[],bytes:''})
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])
    const [productSubName,setProductSubName]=useState('')
    const [description,setDescription]=useState('')
    const [weightType,setWeightType]=useState('')
    const [weight,setWeight]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [quantity,setQuantity]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [error,setError]=useState([])
    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])


    const handleError=(label,msg)=>{
        setError((prev)=>
            ({...prev,[label]:msg})
        )
    }

    const handlePicture=async(event)=>{

        console.log('files',event.target.files)
        if(Object.values(event.target.files).length>=3){

        setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }
        else{
            alert('Pls Upload 3 Or More Files')
        }
    }



    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }
     useEffect(function(){
        fetchAllCategory()
     },[]);
 const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
     }



 const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)

    }
     const fetchAllSubCategory=async(cid)=>{
        var result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status){
            setSubCategoryList(result.data)

        }
    }
    useEffect(function(){
        fetchAllSubCategory()
    },[])
 const fillAllSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


    const fetchAllBrand=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status){
            setBrandList(result.data)
        }
    }
    useEffect(function(){
        fetchAllBrand()
    },[])
    const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllProduct(event.target.value)
    }


    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concern')
        if(result.status)
        {setConcernList(result.data)}
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcern=()=>{
        return concernList.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>

        })

    }



    const fetchAllProduct=async(bid)=>{
        var result=await postData('product/fetch_all_product_by_brandid',{brandid:bid})
        if(result.status){
            setProductList(result.data)
        }
    }
    useEffect(function(){
        fetchAllProduct()
    },[])
    const fillAllProduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }



    const handleSubmit=async()=>{
        var submit=true
        if(productSubName.length==0){
            handleError('productsubname','pls input productsubname..')
            submit=false
        }
        if(submit){
            var formData= new FormData()
            
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubName)
            formData.append('concernid',concernId)
            formData.append('description',description)
            formData.append('weighttype',weightType)
            formData.append('weight',weight)
            formData.append('type',type)
            formData.append('packaging',packaging)
            formData.append('quantity',quantity)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('offertype',offerType)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)

            })
            
            var result= await postData('productdetail/submit_productdetail',formData)
            console.log('dataaaa',result.status)
 
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

    var handleReset=()=>{
        setProductSubName('')
        setBrandId('')
        setCategoryId('')
        setSubCategoryId('')
        setOfferPrice('')
        setOfferType('')
        setPackaging('')
        setPrice('')
        setPicture({file:'logo.webp'})
        setWeight('')
        setWeightType('')
        setQuantity('')
        setConcernId('')

    }

    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return(<div style={{margin:2}}> <Avatar src={URL.createObjectURL(item)}  variant="rounded" alt="remy sharp"></Avatar></div>)
        })
    }

    return(
        <div className={classes.mainbox}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TitleComponent  title='Add New ProductDetails' logo='logo.png' listicon='list.png' page='/admindashboard/displayallproductdetail' />
                     </Grid>
                     <Grid item xs={3}>
                     <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label='Category' onChange={handleCategoryChange}    value={categoryId}    >
                               {fillAllCategory()} 
                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory</InputLabel>
                            <Select label='subcategory' value={subCategoryId} onChange={(event)=>setSubCategoryId(event.target.value)}>
                                {fillAllSubCategory()}

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select label='brand' value={brandId} onChange={handleBrandChange}>
                                {fillAllBrand()}

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Product</InputLabel>
                            <Select label='product' value={productId} onChange={(event)=>setProductId(event.target.value)}>
                                {fillAllProduct()}

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <TextField error={error.productSubName} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.productSubName}</span>} onFocus={()=>handleError('productsubname',null)} label='ProductSubName' value={productSubName} onChange={(event)=>setProductSubName(event.target.value)}  fullWidth/>
                     </Grid>
                     <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Concern</InputLabel>
                    <Select label="Concern"
                    value={concernId}
                    onChange={(event)=>setConcernId(event.target.value)}
                    error={error.concernId}
                    onFocus={()=>handleError('concernId',null)}>
                        {fillAllConcern()}

                    </Select>
                    {error.concernId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.concernId}</span>:<></>}
                </FormControl>
            </Grid>
                     <Grid item xs={12}>
                     <ReactQuill modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} />
                     </Grid>
                     <Grid item xs={3}>
                        <TextField value={weight} onChange={(e)=>setWeight(e.target.value)} label='Input Weight' fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Weight Type</InputLabel>
                            <Select label='Weight Type' value={weightType} onChange={(event)=>setWeightType(event.target.value)}> 
                            <MenuItem value={'mg'}>mg</MenuItem>
                         <MenuItem value={'ml'}>ml</MenuItem>
                         <MenuItem value={'liter'}>liter</MenuItem>
                         <MenuItem value={'gm'}>gm</MenuItem>
                         <MenuItem value={'kg'}>kg</MenuItem>
                         <MenuItem value={'mm'}>mm</MenuItem>

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select label='Type' value={type} onChange={(event)=>setType(event.target.value)}>
                            <MenuItem value={"Tablet"}>Tablet</MenuItem>
                        <MenuItem value={"Capsules"}>Capsules</MenuItem>
                        <MenuItem value={"Drop"}>Drop</MenuItem>
                        <MenuItem value={"Injections"}>Injections</MenuItem>
                        <MenuItem value={'lotion'}>Lotion</MenuItem>
                        <MenuItem value={'syrup'}>Syrup</MenuItem>
                        <MenuItem value={'powder'}>Powder</MenuItem>
                        <MenuItem value={'gel'}>Gel</MenuItem>
                        <MenuItem value={'cream'}>Cream</MenuItem>
                        <MenuItem value={'spray'}>Spray</MenuItem>
                        <MenuItem value={'bar'}>Bar</MenuItem >
                        <MenuItem value={'other'}>Other</MenuItem>

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Packaging</InputLabel>
                            <Select label='packaging' value={packaging} onChange={(event)=>setPackaging(event.target.value)}>
                            <MenuItem value={"Bottles"}>Bottles</MenuItem>
                        <MenuItem value={"Packs"}>Packs</MenuItem>

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3}>
                        <TextField label='Input Quantity' value={quantity} onChange={(event)=>setQuantity(event.target.value)}  fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <TextField label='Input Price' value={price} onChange={(event)=>setPrice(event.target.value)}  fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <TextField label='Input OfferPrice' value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)}  fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Offer Type</InputLabel>
                            <Select label='offertype' value={offerType} onChange={(event)=>setOfferType(event.target.value)}>
                            <MenuItem value={"Month end sale"}>Month end sale</MenuItem>

                            </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <Button variant="contained" component='label' fullWidth>
                            Upload
                            <input onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                        </Button>
                     </Grid>
                     <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                        {showImages()}
                       
                     </Grid>
                     <Grid item xs={6}>
                <Button variant="contained" onClick={handleSubmit} fullWidth >Submit</Button>
               </Grid>
               <Grid item xs={6}>
                <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
               </Grid>
                     </Grid>
            </div>

        </div>
    )
}