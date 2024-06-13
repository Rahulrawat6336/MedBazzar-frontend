import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Divider, Grid ,Paper,Avatar} from "@mui/material";
import { serverURL } from "../../../services/FetchNodeService";
import { createRef, useEffect, useState } from "react";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactImageMagnify from 'react-image-magnify';



export default function ProductPicture(props){

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  var sld=createRef()
  var settings = {
    dots: matches?false:true,
      infinite: true,
      speed: 500,
      slidesToShow: matches?4:1,
      slidesToScroll: 1,
      vertical:matches?true:false,
      arrows:false,
      fade:matches?false: true,
      cssEase: matches?'':'linear'
      
      
    };



  var  productpic=props?.item
  var images=(productpic)?.multi_picture.split(',')
    

    const [mainImage,setMainImage]=useState('')

    const handleChangeImage=(item)=>{
      setMainImage(item)
    }

    useEffect(function(){
      setMainImage(images[0])
    },[props])

  


  
    
    
     console.log('aaaaa',(images[0]))

     const showProduct=()=>{
        return images?.map((item)=>{
            return<div><Paper elevation={0} ><Avatar  variant="square" alt='' src={`${serverURL}/images/${item}`}  onMouseOver={()=>handleChangeImage(item)}  style={{width:'auto',height:'auto',objectFit:'cover',aspectRatio:3/3,border:matches?'3px solid green':'',marginLeft:matches?2:0,background:'',zIndex:2,cursor:'pointer'}}/></Paper></div>
        })

     }


    //  const showProduct1=()=>{
    //         return<div><Paper elevation={0} ><Avatar  variant="square" alt='' src={`${serverURL}/images/${mainImage}`} style={{width:'90%',aspectRatio:3/3,border:'2px solid white',height:"10%",boxShadow:"0 0 0px #fff",}}/></Paper></div>
    //     }

     
     

     const handleForward=()=>{
        sld.current.slickNext()
     }
     const handleBackward=()=>{
        sld.current.slickPrev()
     }




      return (
      
      <Grid container spacing={3} style={{display:'flex',width:'85%',height:'45%',border:'0px solid white',justifyContent:'center',alignItems:'stretch',left:'10%',marginTop:'0%',flexDirection:'row',background:'',position:'relative',}}>
        {matches?<Grid item xs={matches?6:12} style={{ display:'block',position:'relative',}}>
          <div  style={{width:'29%',height:'',boxSizing:'border-box',objectFit:'cover',backgroundSize:'100% 100%'}}>
    
    <KeyboardArrowUpOutlinedIcon style={{height:40,width:40,borderRadius:20,background:'#95a5a6',display:'flex',marginTop:'-8%',left:'15%',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:2,opacity:0.5}} onClick={handleBackward}/>

  
        <Slider ref={sld} {...settings}>
          {showProduct()}
        </Slider>
    <KeyboardArrowDownOutlinedIcon  style={{height:40,width:40,borderRadius:20,background:'#95a5a6',display:'flex',marginTop:'0%',left:'15%',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:2,opacity:'0.5'}} onClick={handleForward}/>

         </div>
        </Grid>:<></>}



        <Grid item xs={matches?6:12}  style={{display:'block',position:'relative',top:'0.1%',left:'-20%'}}>
        <div style={{display:'flex',marginLeft:"90%"}}>
    <FavoriteBorderOutlinedIcon/>
    <ShareOutlinedIcon style={{marginLeft:5}}/>
      
      </div>     
 {matches?<div>

  <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: `${serverURL}/images/${mainImage}`,
        sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
        
        
    },
    largeImage: {
        src:`${serverURL}/images/${mainImage}`,
        width: 1400,
        height: 2000,
        sizes:''
        
    },
    // isHintEnabled:true,
    enlargedImagePosition:'beside',
    lensStyle:{background:'rgba(0,0,0,.5)'}
}} />
  
  </div> :<></>}

        </Grid>

        {matches? <></>:<Grid item xs={12} style={{marginRight:'25%'}}>
        <div>
         <Slider ref={sld} {...settings}>
          {showProduct()}
        </Slider>
       </div>
        </Grid>}
        </Grid>
      );
    }