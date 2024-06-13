import { useStyles } from "./ProductsCss"
import MaterialTable from "@material-table/core"
import { useState,useEffect } from "react"
import { getData, postData, serverURL } from "../services/FetchNodeService"
import { Button,Grid,Avatar,TextField } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from "../components/admin/TitleComponent"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"

export default function DisplayAllProducts(){
    var navigate= useNavigate()
    var classes=useStyles()

    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [picture,setPicture]=useState({file:'logo.webp',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [productData,setProductData]=useState([])
    const [productId,setProductId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
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

    
    const fetchAllProduct=async()=>{

       
        var result=await getData('product/display_all_product')
        console.log('dataaa',result.data)
        if(result.status){
            setProductData(result.data)
        }
        
    }
    useEffect(function(){
        fetchAllProduct()
    },[])

    const handleOpen=(rowData)=>{
        setOpen(true)
        fetchAllSubCategory(rowData.subcategoryid)
        fetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        setProduct(rowData.productname)
        setDescription(rowData.description)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)

    }

    const handleClose=()=>{
        setOpen(false)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture=(event)=>{
    
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
         setShowBtn(true) 
       }
    const handleEditData=async()=>{
        var submit=true
        if(product.length==0){
            handleError('product','pls inter product name...')
            submit=false
        }
        if(description.length==0){
            handleError('description','pls inter description...')
            submit=false
        }
        if(submit){
            var body={categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productname:product,description:description}
            var result=await postData('product/edit_product_data',body)
            
                if(result.status)
                {
                 Swal.fire({
                   icon: "Success",
                   title: result.message,
                   timer: 1500 ,
                   toast: true  
                 });
                }
                else{
                 Swal.fire({
                   icon: "error",
                   title: result.message,
                   timer: 1500  ,
                   toast: true 
                 });
                }
                
                // alert(result.message)
               fetchAllProduct()
            
        }
    }
     const handleEditPicture=async()=>{
    
        var formData=new FormData()
        formData.append('productid',productId)
        formData.append('picture',picture.bytes)
        var result= await postData('product/edit_product_picture',formData)
        if(result.status)
        {
         Swal.fire({
           icon: "Success",
           title: result.message,
           timer: 1500 ,
           toast: true  
         });
        }
        else{
         Swal.fire({
           icon: "error",
           title: result.message,
           timer: 1500  ,
           toast: true 
         });
       }

     }
     const handleCancel=()=>{
        setShowBtn(false)
        setPicture({file:tempPicture,bytes:''})
     }


     const handleDelete=async(rowData)=>{
        Swal.fire({
            title: "Do you want to delete product?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "delete",
            denyButtonText: `Don't delete`
        }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={productid:rowData.productid};
              var result= await postData('product/Delete_product_data',body)
              if(result.status){
      Swal.fire({toast:true,title:'Deleted !', icon:'success'});
      fetchAllProduct()
    }
    else{
      Swal.fire({toast:true,title:'Fail to delete RECORD !', icon:'success'});
    }

            } else if (result.isDenied) {
              Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
            }
          });
     }

    function showProductsForm(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"md"}
          >
            <DialogContent>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TitleComponent  title='Add New Product' logo='logo.png' listicon='list.png' />
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
                            <Select value={subCategoryId} label='SubCategory' onChange={(event)=>setSubCategoryId(event.target.value)}  >
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
                        <TextField value={product} error={error.product} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.product}</span>} onFocus={()=>handleError('product',null)} onChange={(event)=>setProduct(event.target.value)}  label='Product Name' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField value={description} error={error.description} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.description}</span>} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)}  label='Description' fullWidth />
               </Grid>
               <Grid item xs={6}>
                {showBtn?<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button onClick={handleEditPicture}  fullWidth>Save</Button><Button onClick={handleCancel}  fullWidth>Cancel</Button></div>:<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                 </div> }
                
    
               </Grid>
               <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy sharp" src={picture.file} variant="rounded" style={{width:100,height:100}}></Avatar>
               </Grid>
             
                </Grid>
                </div>
             
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditData}>Edit Data</Button>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )

    }


    function showProducts(){
                return (
                  <MaterialTable
                    title="Main Product"
                    columns={[
                        { title: 'Product', field: 'productid' },
                        { title: 'Category', field: 'categoryname' },
                        { title: 'SubCategory', field: 'subcategoryname' },
                        { title: 'Brand', field: 'brandname' },
                      { title: 'Product', field: 'productname' },
                      { title: 'Description', field: 'description' },
                      { title: 'Picture', field: 'picture', render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{height:60,width:60,borderRadius:30}} ></img></>},
                  
                    ]}
                    data={productData}
                    options={{
                      paging:true,
                      pageSize:3,       // make initial page size
                      emptyRowsWhenPaging: false,   // To avoid of having empty rows
                      pageSizeOptions:[3,5,7,10],    // rows selection options
                    }} 
                         
                    actions={[
                      {
                        icon: 'edit',
                        tooltip: 'edit product',
                        onClick: (event, rowData) =>  handleOpen(rowData)
                      },
                      {
                        icon: 'delete',
                        tooltip: 'delete product',
                        onClick: (event, rowData) =>  handleDelete(rowData)
                      },
                      {
                        icon: 'add',
                        tooltip: 'Add New Brand',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/product')
                      }
                    ]}
                  />
                )
              }

    
    return(
        <div className={classes.root}>
            <div className={classes.boxdisplay}>
                {showProducts()}
            </div>
            {showProductsForm()}

        </div>
    )
}