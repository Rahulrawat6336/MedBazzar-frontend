import { Grid } from "@mui/material";
import Filter from "../../components/admin/userinterface/FilterList"
import Header from "../../components/admin/userinterface/Header";
import MenuBar from "../../components/admin/userinterface/MenuBar";
import ProductList from "../../components/admin/userinterface/ProductList";
import FooterComponent from "../../components/admin/userinterface/FooterComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from "react";
import { postData } from "../../services/FetchNodeService";
import { useLocation ,useParams} from "react-router-dom";


export default function FilterPage(props){

    var location=useLocation()
    var params=useParams()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [productList,setProductList]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)

    var categoryid=''
    try{
        if(location.state.categoryid==undefined){
            categoryid=null
        }
        else{
        categoryid=location.state.categoryid
        }
    }
    catch(e)
    { categoryid=null}

    var subcategoryid=''
    try{
        if(location.state.subcategoryid==undefined){
            subcategoryid=null
        }
        else{
        subcategoryid=location.state.subcategoryid
        }
    }
    catch(e)
    { subcategoryid=null}

    // var pattern=''
    // try{
    //     pattern=location.state.pattern
    // }
    // catch(e)
    // { pattern=null}

    
    // const fetchAllProduct=async(key,data)=>{
    //     var result=await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'pattern':pattern})

    //     setProductList(result.data)
    // }

    // useEffect(function(){
    //     fetchAllProduct('categoryid',categoryid)
    // },[])


    const fetchAllProduct=async()=>{
            var result=await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'subcategoryid':subcategoryid,'pattern':params['*']})
    
            setProductList(result.data)
        }
    
        useEffect(function(){
           fetchAllProduct()
        },[params['*']])


    return(
        <Grid container spacing={3} style={{height:'100%',position:'relative',width:'auto',fontFamily:'kanit',display:'flex',flexDirection:'row'}}>
       <Grid item xs={12} >
        <div style={{position:'fixed',width:'100%',top:0,zIndex:1}}><Header  /></div>
        </Grid>
        <Grid item xs={12} >
    
        <div style={{position:'relative',top:'40%',}}>{matches?  <MenuBar/> :<div></div>}</div>
        </Grid>
        <Grid item xs={matches?4:6} style={{background:'#fff',position:matches?'':'sticky',marginTop:matches?0:70,top:0}}>
            <Filter/>
        </Grid>
        <Grid item xs={matches?8:6} style={{background:'#fff',position:matches?'':'relative',top:matches?0:50}}>
            <div>
                <span>{productList.categoryname}{productList.picture}</span>
            <ProductList pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productList}/>
            </div>
        </Grid>
        {matches?  <Grid item xs={12} style={{marginTop:'3%'}}>
            <FooterComponent/>
        </Grid> :<div></div>}
    </Grid>)
}