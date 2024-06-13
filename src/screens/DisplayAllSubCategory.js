import MaterialTable from "@material-table/core";
import { useStyles } from "./SubCategoryCss"
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../services/FetchNodeService"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from "../components/admin/TitleComponent";
import Swal from "sweetalert2";
import DialogTitle from '@mui/material/DialogTitle';
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"

export default function DisplayAllSubCategory(){
  var navigate=useNavigate()
    var classes=useStyles()
    const [subCategoryData,setSubCategoryData]=useState([])

    const [open,setOpen]=useState(false)
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const [categoryId,setCategoryId]=useState('')
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
    const handlePicture=(event)=>{
    
     setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setShowBtn(true) 
    }
    const handleCancel=()=>{
      setPicture({file:tempPicture,bytes:''})
      setShowBtn(false)
      }
    
   const handleError=(label,msg)=>{
   setError((prev)=>({...prev,[label]:msg}))
   
   }

   

   const handleEditData=async()=>{

    var submit=true
   if(subCategory.length==0)
   {
    handleError('subcategory','Pls input category name...')
    submit=false
   }
  //  if(picture.bytes.length==0)
  //  {
  //   handleError('picture','Pls choose icon...')
  //   submit=false
  //  }
   if(submit)
   {
    var body={categoryid:categoryId,subcategoryid:subCategoryId,subcategoryname:subCategory}
    var result=await postData('subcategory/Edit_subcategory_data',body)

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
   fetchAllSubCategory()
    
    }
  }
 
    const handleEditPicture=async()=>{
      
      var formData=new FormData()
      formData.append('subcategoryid',subCategoryId)
      formData.append('icon',picture.bytes)
      var result=await postData('subcategory/Edit_subcategory_picture',formData)

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
     fetchAllSubCategory()
      
      }

      const handleDelete=async(rowData)=>{

      
       
          Swal.fire({
            title: "Do you want to delete categoty?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "delete",
            denyButtonText: `Don't delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={subcategoryid:rowData.subcategoryid};
              var result= await postData('subcategory/Delete_subcategory_data',body)
              if(result.status){
      Swal.fire({toast:true,title:'Deleted !', icon:'success'});
      fetchAllSubCategory()
    }
    else{
      Swal.fire({toast:true,title:'Fail to delete RECORD !', icon:'success'});
    }

            } else if (result.isDenied) {
              Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
            }
          });
        

      }
   


    const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    console.log('DAAATTAAA',result.data)
    if(result.status)
    { setSubCategoryData(result.data)
    
    }
    
    }
    useEffect(function(){
   fetchAllSubCategory()

    },[])
  
  const handleClose=()=>{
   setOpen(false)

  }

  const handleOpen=(rowData)=>{
    setOpen(true)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategory(rowData.subcategoryname)
    setPicture({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.icon}`)
  }



  const showSubCategoryForm=()=>{
  return(
     <Dialog
      open={open}
      onClose={handleClose} 
      maxWidth={"md"}
      >
       
      <DialogContent >
      <div className={classes.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <TitleComponent title="Edit subcategory Data" logo="logo.png" listicon="list.png"/>
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
            <TextField value={subCategory} onFocus={()=>handleError('subcategory',null)} error={error.subCategory} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.subcategory}</span>} onChange={(event)=>setSubCategory(event.target.value)} label="subCategory Name" fullWidth />
            </Grid>
           
            <Grid item xs={6}>
             {showBtn?<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}} >
                <Button variant="contained" component="label" fullWidth >
                 Set New Picture 
                 <input onClick={()=>handleError('picture',null) } onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
                </div>}
            
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
             <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:100,height:100}} />
            </Grid>
                

          </Grid> 
        </div>

      </DialogContent>
      <DialogActions>
      <Button onClick={handleEditData} >Edit Data</Button>
        <Button onClick={handleClose} >Close</Button>
        
      </DialogActions>
     </Dialog>

  )

   }



    function showSubCategory() {
        return (
          <MaterialTable
            title="Main SubCategories"
            columns={[
             { title: 'Category Id', field: 'categoryid' },
              { title: 'SubCategory Id', field: 'subcategoryid' },
              { title: 'SubCategory Type', field: 'subcategoryname' },
              { title: 'Icon', field: 'icon',render:(rowData)=><><img src={`${serverURL}/images/${rowData.icon}`} style={{width:60,height:60,borderRadius:30}}/></>}

               
            ]}
            data={subCategoryData} 
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit subCategory',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'delete subCategory',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New SubCategory',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/subcategory')
              }
            ]}
          />
        )
      }

  return(<div className={classes.root}>
    <div className={classes.boxdisplay}>
    {showSubCategory()}
  </div>
  {showSubCategoryForm()}
  </div>
   )

}


