import { Grid } from "@mui/material";
import Header from "../../components/admin/userinterface/Header";
import MenuBar from "../../components/admin/userinterface/MenuBar";
import ProductPicture from "../../components/admin/userinterface/ProductPicture";
import ProductInfo from "../../components/admin/userinterface/ProductInfo";
import FooterComponent from "../../components/admin/userinterface/FooterComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react'


export default function ProductDetail(){



    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [pageRefresh,setPageRefresh]=useState(false)

    var location=useLocation()
    var item =location?.state?.data
    // alert(JSON.stringify(item))


    // const [isSticky, setIsSticky] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsSticky(window.scrollY > -10000); // Adjust the threshold as needed
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return(
    
    <Grid container spacing={3} style={{width:'auto',position:'relative',fontFamily:'kanit',height:'100%',display:'flex',flexDirection:matches? 'row' :'column' }}>
        {/* <Grid item xs={12}>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        </Grid> */}
         <Grid item xs={12} >
        <div style={{position:'fixed',width:'100%',top:0,zIndex:1}}><Header  /></div>
        </Grid>
        <Grid item xs={12} >
    
        <div style={{position:'relative',top:'40%',}}>{matches?  <MenuBar/> :<div></div>}</div>
        </Grid>
       
       
        
        <Grid item xs={matches?6:12}style={{display:'flex',justifyContent:'center',marginTop:'5%',position:matches?'sticky':'',top:'15%',minHeight:matches?'100%':'',}}>
        <ProductPicture item={item}/>
            </Grid>
            <Grid itemxs={matches?6:12} style={{display:'flex',width:matches?'50%':'100%',justifyContent:'center',marginTop:'5%',position:'relative',top:0}}>
        <ProductInfo item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </Grid>

            
            {matches?  <Grid item xs={12} style={{marginTop:'3%',zIndex:1}}>
            <FooterComponent/>
        </Grid> :<div></div>}
    </Grid>
    )
}