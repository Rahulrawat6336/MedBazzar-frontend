import BrandComponent from "../../components/admin/userinterface/BrandComponent";
import CategoryComponent from "../../components/admin/userinterface/CategoryComponent";
import FooterComponent from "../../components/admin/userinterface/FooterComponent";
import Header from "../../components/admin/userinterface/Header";
import MenuBar from "../../components/admin/userinterface/MenuBar";
import ProductComponent from "../../components/admin/userinterface/ProductComponent";
import SliderComponent from "../../components/admin/userinterface/SliderComponent";
import { Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { StrictMode, useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchNodeService";
import ConcernComponent from "../../components/admin/userinterface/ConcernComponent";


export default function Home(){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
   

    const [bannerList,setBannerList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [productListOffer,setProductListOffer]=useState([])
    const [concernList,setConcernList]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)

    const fetchAllBanner=async()=>{
        var result=await postData('userinterface/show_all_banners',{bannertype:'general'})

        setBannerList(result.data)
    }

    const fetchAllBrand=async()=>{
        var result=await getData('userinterface/show_all_brand',)

        setBrandList(result.data)
    }
    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/show_all_Category',)

        setCategoryList(result.data)
    }

    const fetchAllProductDetail=async(offertype)=>{
        var result=await postData('userinterface/display_all_productdetail_by_offer',{offertype})

        setProductListOffer(result.data)
    }

    const fetchAllConcern=async()=>{
        var result=await getData('userinterface/display_all_Concern',)

        setConcernList(result.data)
    }


    useEffect(function(){
        fetchAllBanner()
        fetchAllBrand()
        fetchAllCategory()
        fetchAllProductDetail('month end sale')
        fetchAllConcern()
    },[])


    return(
        <StrictMode>
        <div style={{height:'auto',fontFamily:'kanit',}}>
          <div >
            
           <div style={{position:'fixed',width:'100%',display:'flex',top:0,zIndex:2}}> <Header  /></div>
          {matches? <div style={{position:'relative',top:50}}> <MenuBar/></div>:<div></div>}

          </div>  
           
            <div style={{display:'flex',justifyContent:'center',marginTop:matches?20:90,position:'relative',top:50,width:'100%'}}>
            <SliderComponent  data={bannerList}/>
            </div>
            <Divider style={{height:2.5,background:'#95a5a6',opacity:'0.5',marginTop:25,position:'relative',top:50,width:'100%'}}/>
            <div style={{display:'flex',justifyContent:'center',marginTop:25,position:'relative',top:50,width:'100%'  }}>
                <BrandComponent title="Brands" data={brandList}/>
            </div>
            <Divider style={{height:2.5,background:'#95a5a6',opacity:'0.5',marginTop:25,position:'relative',top:50,width:'100%'}}/>
            <div style={{display:'flex',justifyContent:'center',marginTop:25, position:'relative',top:50,width:'100%' }}>
                <CategoryComponent  data={categoryList} title="Browse by category"/>
            </div>
            <Divider style={{height:2.5,background:'#95a5a6',opacity:'0.5',marginTop:25,position:'relative',top:50,width:'100%'}}/>
            <div style={{display:'flex',justifyContent:'center',marginTop:25,position:'relative',top:50,width:'100%'  }}>
            <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title="Month End Sale" data={productListOffer} />
            </div>
            <Divider style={{height:2.5,background:'#95a5a6',opacity:'0.5',marginTop:25,position:'relative',top:50,width:'100%'}}/>
            <div style={{display:'flex',justifyContent:'center',marginTop:25,position:'relative',top:50,width:'100%'  }}>
                <ConcernComponent data={concernList} title="Concern"/>
            </div>
          {matches?<div style={{display:'flex',justifyContent:'center',marginTop:70,position:'relative',top:50  }}>
                <FooterComponent/>
            </div> :<div></div>}
        </div>

        </StrictMode>
    )
   
}