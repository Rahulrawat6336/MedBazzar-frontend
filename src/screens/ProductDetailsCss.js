import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    mainbox:{
        height:'100vh',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#ecf0f1',
        fontFamily:'kanit'
    },
    box:{
        height:'auto',
        width:800,
        background:'#fff',
        padding:10,
        borderRadius:10

    },
    boxdisplay:{
        height:'auto',
        maxHeight:700,
        overflowY:'auto',
        width:1000,
        background:'#fff',
        padding:10,
        borderRadius:10

    }
})