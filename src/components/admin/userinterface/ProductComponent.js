
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeService";
import { Paper,Avatar, Divider, Button } from "@mui/material";
import { createRef } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PlusMinusComponent from "./PlusMinusComponent";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";


export default function ProductComponent(props){

  const navigate = useNavigate()

  var sld =createRef()
  var dispatch=useDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  var productFromRedux=useSelector(state=>state.data)
    var productRedux=Object.values(productFromRedux)


  const handleChange=(v,item)=>{
    if(v>0){
   item['qty']=v
     dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
    }
    else{
      dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
    }

     props.setPageRefresh(!props.pageRefresh) 

    
     }

     const handleProductDetail=(item)=>{
      navigate('/productdetail',{state:{data:item}})

  }

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow:matches?7:2,
        slidesToScroll: 1,
        arrows: false,
      };

      var product=props.data

    

      const showProduct=()=>{
        return product?.map((item)=>{
            return<div style={{height:'auto',width:'95%',justifyContent:'space-around'}}>
                <BookmarkAddOutlinedIcon style={{marginLeft:'auto',display:'flex'}}/>
                <img  onClick={()=>handleProductDetail(item)}  src={`${serverURL}/images/${item.picture}`} style={{width:'60%',aspectRatio:3/3,borderRadius:0,height:'auto',}} />
                <img src='logo.png'  style={{height:22,width:55,display:'flex',marginLeft:'55%'}}/>
                <div style={{
                  fontSize: matches?"1.0em":".7em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}>  
                {item.description.length<=20?<div>{item.description}<div>&nbsp;</div></div>:item.description}
              </div>  
                
                <div>{item.weight} {item.weighttype}</div>  
                {item.offerprice == 0 ? 
                        <div style={{fontSize:20,fontWeight:'bolder'}} >
                            &#8377;{item.price}
                        </div> :
                            
                        <div  >
                            <span style={{fontFamily:'kanit',fontSize:20,fontWeight:'bold'}} > &#8377;{item.offerprice} </span>
                            <span style={{fontFamily:'kanit',fontSize:15,color:'gray'}} > <s>MRP &#8377;{item.price}</s> </span>
                            <span style={{fontFamily:'kanit',fontSize:11,background:'#f5a623',padding:3,borderRadius:15,color:'#6a7d27'}} > 20% Off </span>
                        </div>}
          
        


          <Divider style={{width:200 ,background:'#95a5a6'}}/>
          <div style={{display:'flex',fontSize:13,alignItems:'center'}}><AccessTimeIcon style={{height:15,width:15,marginRight:5,color:'green'}}/>Delivery within <span style={{fontWeight:'bold'}}>1-3 days</span></div>
          <div style={{marginTop:10 ,fontWeight:'#535c68',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
             <PlusMinusComponent qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)} width={80}/>
          <Button style={{marginLeft:'',height:25,width:80,background:'#2C3A47'}} variant="contained">Buy</Button>
          </div>
           </div> 
        })
      }

      
 const handleBackward=()=>{
  sld.current.slickPrev()
 }
 const handleForward=()=>{
  sld.current.slickNext()
 }


      return(<div style={{width:'95%',position:'relative'}}>
        <div style={{fontSize:18,fontWeight:'bold',fontFamily:'kanit',marginTop:15,marginBottom:20,whiteSpace:'nowrap'}}>{props.title}</div>
  <div style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',marginLeft:'-2%',display:'flex',top:'40%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:0.5}}>
    <ArrowBackIosIcon onClick={handleBackward}/>
  </div>
    <Slider ref={sld} {...settings}>
     {showProduct()}
  </Slider>
  <div  style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',display:'flex',top:'40%',right:'0.01%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:0.5}}>
    <ArrowForwardIosIcon onClick={handleForward}/>
  </div>
  </div>
);
}