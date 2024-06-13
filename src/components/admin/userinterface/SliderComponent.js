import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {serverURL} from "../../../services/FetchNodeService" 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function SliderComponent(props){

  var sld =createRef()

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));


    var settings = {
        dots: matches?false:true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true,
        arrows: false,
        fade:matches?false: true,
  cssEase: matches?'':'linear'
      };  
      
      
 var banners=props?.data
 var images=Object.values(banners)[0]?.picture.split(",")

 const showSlide=()=>{
    return images?.map((item)=>{
        return<div ><img src={`${serverURL}/images/${item}`} style={{width:'95%',height:'auto', borderRadius:10,marginLeft:'auto',marginRight:'auto'}} /></div>

    })
 }

 const handleBackward=()=>{
  sld.current.slickPrev()
 }
 const handleForward=()=>{
  sld.current.slickNext()
 }



 return(<div style={{width:'95%',position:'relative'}}>
  <div style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',marginLeft:'-2%',display:'flex',top:'40%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:'0.5'}}>
    <ArrowBackIosIcon onClick={handleBackward}/>
  </div>
    <Slider ref={sld} {...settings}>
     {showSlide()}
  </Slider>
  <div  style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',display:'flex',top:'40%',right:'0.01%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:'0.5'}}>
    <ArrowForwardIosIcon onClick={handleForward}/>
  </div>
  </div>
);
}
