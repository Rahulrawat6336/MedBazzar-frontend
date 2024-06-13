import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeService";
import { Paper,Avatar } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function BrandComponent(props){

  var sld= createRef()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow:matches?7:3,
        slidesToScroll: 1,
        arrows: false,
      };

      var brands= props.data
      

      const showBrand=()=>{
        return brands?.map((item)=>{
            return<paper  elevation={0}><Avatar  variant="square" alt="Cindy Baker" src={`${serverURL}/images/${item.brandicon}`} style={{width:'95%',borderRadius:10,marginRight:"auto",marginLeft:'auto',height:'auto',zIndex:2, boxShadow:"0 0 60px #ecf0f1"}} /></paper>
            
        })
      }

      const handleBackward=()=>{
        sld.current.slickPrev()
       }
       const handleForward=()=>{
        sld.current.slickNext()
       }


      return (<div style={{width:'95%',position:'relative'}}>
        <div style={{fontSize:18,fontWeight:'bold',fontFamily:'kanit',marginTop:15,marginBottom:20}}>{props.title}</div>
        
        <div style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',marginLeft:'-2%',display:'flex',top:'55%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:'0.5'}}>
    <ArrowBackIosIcon onClick={handleBackward}/>
  </div>
    <Slider ref={sld} {...settings}>
     {showBrand()}
  </Slider>
  <div  style={{height:matches?40:20,width:matches?40:20,borderRadius:matches?20:10,background:matches?'#95a5a6':'',display:'flex',top:'55%',right:'0.1%',justifyContent:'center',alignItems:'center',position:'absolute',opacity:'0.5'}}>
    <ArrowForwardIosIcon onClick={handleForward}/>
  </div>
  </div>
);
}