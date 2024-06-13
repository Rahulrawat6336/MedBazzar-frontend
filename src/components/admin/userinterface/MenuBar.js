import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../../../services/FetchNodeService";
import { MenuItem,Box,AppBar,Toolbar, Button ,Menu} from "@mui/material";

export default function MenuBar(){
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose=()=>{
        setAnchorEl(null)
    }

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        console.log('DAAATTAAA',result.data)
        if(result.status)
        { setCategoryList(result.data)}
        
        }
        useEffect(function(){
       fetchAllCategory()
    
        },[])


        
        const fetchAllSubCategory=async(cid)=>{

            var result=await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:cid})
            setSubCategoryList(result.data)
        }
        useEffect(function(){
            fetchAllSubCategory()
         
             },[])


        const handleSubCategory=(categoryid,event)=>{
            fetchAllSubCategory(categoryid)
            setAnchorEl(event.currentTarget)

        }

        const showAllCategory=()=>{
        return categoryList?.map((item)=>{
            return <Button onClick={(event)=>handleSubCategory(item.categoryid,event)} style={{color:'#000'}}>{item.categoryname}</Button>
        })
        }

        const showAllSubCategory=()=>{
            return subCategoryList?.map((item)=>{
                return <MenuItem >{item.subcategoryname} </MenuItem>
            })
            }


    return(<div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{background:'#fff'}} position="static">
            <Toolbar style={{display:'flex',justifyContent:'center'}}> 
            {showAllCategory()}
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
           {showAllSubCategory()}
        </Menu>
            </Toolbar>
            </AppBar>
            </Box>



    </div>)
}