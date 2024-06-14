import { Grid } from "@mui/material";
import LogInImage from "../../components/admin/userinterface/LogInImage";
import LogInOTP from "../../components/admin/userinterface/LogInOTP";
import GetOTP from "../../components/admin/userinterface/GetOTP";
import LogInDetails from "../../components/admin/userinterface/LogInDetail";
import Header from "../../components/admin/userinterface/Header";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LogInScreen(){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return(
        <Grid container spacing={2}  style={{display:'flex'}}>
             <Grid item xs={12}>
            <Header/>
            {/* {matches?  <MenuBar/> :<div></div>} */}
        </Grid>
           
            <Grid item xs={12} style={{display:'flex',flexDirection:'row'}}>
           {matches? <Grid item xs={6} style={{marginTop: 15,display: "flex",justifyContent: "center",alignItems: "center",}}>
                <LogInImage/>
            </Grid>:<></>}
            <Grid item xs={matches?6:12}  style={{ marginRight: 10, display: "flex", justifyContent: "center" }}>
          <LogInOTP />
          {/* <GetOTP/> */}
          {/* <LogInDetails/> */}
        </Grid>
        </Grid>
        </Grid>
    )
}