import { useStyles } from "./ProductDetailsCss"
import { useState,useEffect } from "react"
import MaterialTable from "@material-table/core"
import { getData, serverURL,postData } from "../services/FetchNodeService"
import { Button,Grid,Avatar,TextField ,MenuItem,Select,FormControl,InputLabel} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from "../components/admin/TitleComponent"
import Swal from "sweetalert2"
import { Navigate, useNavigate } from "react-router-dom"

export default function DisplayAllProductDetails(){
    var navigate=useNavigate()
    var classes=useStyles()

    const [productDetailId,setProductDetailId]=useState('')
    const [picture,setPicture] =useState({file:'logo.webp',bytes:''})
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
    const [showBtn,setShowBtn]=useState(false)
    const [open,setOpen]=useState(false)
    const [productDetailData,setProductDetailData]=useState([])
    const [tempPicture,setTempPicture]=useState('')
    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])


    const handleOpen=(rowData)=>{
      setOpen(true)
      fetchAllSubCategory(rowData.categoryid)
      fetchAllProduct(rowData.brandid)
      setProductDetailId(rowData.productdetailid)
      setCategoryId(rowData.categoryid)
      setSubCategoryId(rowData.subcategoryid)
      setBrandId(rowData.brandid)
      setProductId(rowData.productid)
      setProductSubName(rowData.productsubname)
      setConcernId(rowData.concernid)
      setDescription(rowData.description)
      setWeight(rowData.weight)
      setWeightType(rowData.weighttype)
      setType(rowData.type)
      setPackaging(rowData.packaging)
      setQuantity(rowData.quantity)
      setPrice(rowData.price)
      setOfferPrice(rowData.offerprice)
      setOfferType(rowData.offertype)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)

    }
    const fetchAllProductDetail=async()=>{

      var result=await getData('productdetail/display_all_productdetail')
      console.log('dataaa',result.data)
      if(result.status)
      {
        setProductDetailData(result.data)
      }
    }
    useEffect(function(){
        fetchAllProductDetail()
    },[])


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



  
  const handleError=(label,msg)=>{
    setError((prev)=>
        ({...prev,[label]:msg})
    )
}

const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
 setShowBtn(true)
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


const handleClose=()=>{
  setOpen(false)
}


const handleEditData=async()=>{
    var submit=true

    if(submit){
        var body={productdetailid:productDetailId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productsubname:productSubName,concernid:concernId,description:description,weight:weight,weighttype:weightType,type:type,packaging:packaging,quantity:quantity,price:price,offerprice:offerPrice,offertype:offerType}
    
        var result=await postData('productdetail/edit_productdetail_data',body)
        
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
                
        fetchAllProductDetail()
    }
}

const handleEditPicture=async()=>{
    
    var formData= new FormData()
    formData.append('productdetailid',productDetailId)
    formData.append('picture',picture.bytes)

    var result=await postData('productdetail/edit_productdetail_picture',formData)
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
       fetchAllProductDetail()
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
          var body={productdetailid:rowData.productdetailid};
          var result= await postData('productdetail/Delete_productdetail_data',body)
          if(result.status){
  Swal.fire({toast:true,title:'Deleted !', icon:'success'});
  fetchAllProductDetail()
}
else{
  Swal.fire({toast:true,title:'Fail to delete RECORD !', icon:'success'});
}

        } else if (result.isDenied) {
          Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
        }
      });
      
}







  const showProductDetailForm=()=>{
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
                    <TitleComponent  title='Edit ProductDetails' logo='logo.png' listicon='list.png'/>
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
                        <TextField value={description} onChange={(e)=>setDescription(e.target.value)} label='Input Description' fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <TextField value={weight} onChange={(e)=>setWeight(e.target.value)} label='Input Weight' fullWidth/>
                     </Grid>
                     <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Weight Type</InputLabel>
                            <Select label='Weight Type' value={weightType} onChange={(event)=>setWeightType(event.target.value)}> 
                            <MenuItem value={'mg'}>Mg</MenuItem>
                         <MenuItem value={'ml'}>Ml</MenuItem>
                         <MenuItem value={'liter'}>liter</MenuItem>

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
                        <MenuItem value={"Injuctions"}>Injuctions</MenuItem>

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
                        {showBtn?<div style={{width:'100%',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button onClick={handleEditPicture} variant="contained" >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{width:'100%',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                        <Button variant="contained" component='label' fullWidth>
                            Upload
                            <input onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                        </Button></div>}
  
                     </Grid>
                     <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                        <Avatar src={picture.file}  variant="rounded" alt="remy sharp"></Avatar>
                     </Grid>
                     </Grid>
            </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData} >Edit Data</Button>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
  }





    var showProductDetail=()=>{
            return (
              <MaterialTable
                title="Main ProductDetails"
                columns={[
                  { title: 'ProductDetailId', field: 'productdetailid' },
                  { title: 'Category',  render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>  },
                
                  { title: 'Product', render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname} {rowData.productsubname} {rowData.weight} {rowData.weighttype}</div></div>  },
                  { title: 'Type', render:(rowData)=><div><div>{rowData.quantity} {rowData.type}</div><div>{rowData.packaging} </div></div> },
       
                  
                  { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice} </div></div>  },
                   
                  { title: 'Offertype', field: 'offertype' },
                  { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(',')[0]}`} style={{height:60,width:60,borderRadius:30}} ></img></> },
                  
                  
                
                ]}
                data={productDetailData}
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
                    tooltip: 'delete productdetail',
                    onClick: (event, rowData) =>  handleDelete(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add New productdetail',
                    isFreeAction: true,
                    onClick: (event) => navigate('/admindashboard/productdetail')
                  }
                ]}
              />
            )
          
    }


    return(
        <div className={classes.mainbox}>
            <div className={classes.boxdisplay}>
                {showProductDetail()}
            </div>
            {showProductDetailForm()}
            
        </div>
    )
}