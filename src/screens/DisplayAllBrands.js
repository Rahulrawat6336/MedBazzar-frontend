import { useStyles } from "./BrandsCss";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../services/FetchNodeService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button,Grid,Avatar,TextField} from "@mui/material";
import TitleComponent from "../components/admin/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBrands()
{
  var navigate=useNavigate()
    var classes= useStyles()

    const [brandData,setBrandData]=useState([])
    const [open,setOpen]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [brand,setBrand]=useState('')
    const [picture,setPicture]=useState({file:'logo.webp',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
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

    const fetchAllBrand=async()=>{
        var result = await getData('brand/display_all_brand')
        console.log('DAAATTAAA',result.data)
        if(result.status){
            setBrandData(result.data)
        }

    }
    useEffect(function(){
        fetchAllBrand()
     
         },[])


         const handleClose=()=>{
            setOpen(false)

         }
         const handleOpen=(rowData)=>{
            setOpen(true)
            setBrand(rowData.brandname)
            setBrandId(rowData.brandid)
            setPicture({file:`${serverURL}/images/${rowData.brandicon}`,bytes:''})
            setTempPicture(`${serverURL}/images/${rowData.brandicon}`)

         }



         const handleEditData=async()=>{
            var submit=true
            if(brand.length==0)
            {
             handleError('brand','Pls input brand name...')
             submit=false
            }
            if(submit){
                var body={brandid:brandId,brandname:brand}
                var result=await postData('brand/edit_brand_data',body)
                // alert(result.message)
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
               fetchAllBrand()
            }
         }


         const handleEditPicture=async()=>{
             var formData = new FormData()
             formData.append("brandid",brandId)
             formData.append('brandicon',picture.bytes)

             var result=await postData('brand/edit_brand_picture',formData)
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



         const handleDelete=async(rowData)=>{

            Swal.fire({
                title: "Do you want to delete brand?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "delete",
                denyButtonText: `Don't delete`
            }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  var body={brandid:rowData.brandid};
                  var result= await postData('brand/Delete_brand_data',body)
                  if(result.status){
          Swal.fire({toast:true,title:'Deleted !', icon:'success'});
          fetchAllBrand()
        }
        else{
          Swal.fire({toast:true,title:'Fail to delete RECORD !', icon:'success'});
        }
    
                } else if (result.isDenied) {
                  Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
                }
              });
         }




         const ShowBrandsForm=()=>{
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
                      <TitleComponent title="Edit Brands Data" logo="logo.png" listicon="list.png"/>
                      </Grid>
          
                      <Grid item xs={12}>
                      <TextField value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="brand Name" fullWidth />
                      </Grid>
                     
                      <Grid item xs={6}>
                       {showBtn?<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}} >
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
                  <Button onClick={handleClose}  >Close</Button>
                  
                </DialogActions>
               </Dialog>
            )
         }




    function ShowBrands(){
        return (
                  <MaterialTable
                    title="Main Brands"
                    columns={[
                      { title: 'Brand Id', field: 'brandid' },
                      { title: 'Brand Type', field: 'brandname' },
                      { title: 'Icon', field: 'brandicon',render:(rowData)=><><img src={`${serverURL}/images/${rowData.brandicon}`} style={{width:50,height:50,borderRadius:25}}></img></> },
                    
                    ]}
                    data={brandData}  
                    options={{
                      paging:true,
                      pageSize:3,       // make initial page size
                      emptyRowsWhenPaging: false,   // To avoid of having empty rows
                      pageSizeOptions:[3,5,7,10],    // rows selection options
                    }}      
                    actions={[
                      {
                        icon: 'edit',
                        tooltip: 'Edit brand',
                        onClick: (event, rowData) => handleOpen(rowData)
                      },
                      {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) =>  handleDelete(rowData)
                      },
                      {
                        icon: 'add',
                        tooltip: 'Add New Brand',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/brand')
                      }
                    ]}
                  />
                )
              }


    return(
        <div className={classes.root}> 
        <div className={classes.boxdisplay}>
            {ShowBrands()}

        </div>
        {ShowBrandsForm()}
        
        </div>
        );
};