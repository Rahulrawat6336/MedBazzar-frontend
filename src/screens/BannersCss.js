import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    root:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'kanit',
        background:'#ecf0f1'
    },
    box:{
        width:600,
        height:300,
        background:'#fff',
        borderRadius:10,
        padding:10
    }
})