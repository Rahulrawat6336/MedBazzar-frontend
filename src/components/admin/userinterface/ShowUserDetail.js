import { Divider, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

export default function ShowUserDetail(props) {
       

    var navigate = useNavigate()
    const handleClick=()=>{
        
        console.log('hallo::')
        navigate('/myorder')

    }



    return (<Paper elevation={2} style={{ display: props.open ? 'flex' : 'none', position: 'absolute', top: 50, right: 70, zIndex: 3 }}>
        <div style={{ display: 'flex', width: 300, height: 'auto', flexDirection: 'column', background: '', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '4%', marginBottom: '5%' }}>
                <PersonOutlineOutlinedIcon style={{ color: '#64748B' }} />
                <span style={{ fontWeight: 'bold' }}>View Profile</span>
                <ArrowForwardIosOutlinedIcon style={{ marginLeft: 'auto' }} />
            </div>
            <Divider />
            <div onClick={handleClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '4%', marginBottom: '5%', cursor: 'pointer' }}>
                <ListAltOutlinedIcon style={{ color: '#64748B' }} />
                <span style={{ fontWeight: 'bold' }}>My Orders</span>
                <ArrowForwardIosOutlinedIcon style={{ marginLeft: 'auto' }} />
            </div>
            <Divider />
            <div onClick={()=>navigate('/address')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '4%', marginBottom: '5%' }}>
                <PlaceOutlinedIcon style={{ color: '#64748B' }} />
                <span style={{ fontWeight: 'bold' }}>Save Addresses</span>
                <ArrowForwardIosOutlinedIcon style={{ marginLeft: 'auto' }} />
            </div>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '4%', marginBottom: '5%' }}>
                <LogoutOutlinedIcon style={{ color: 'red' }} />
                <span onClick={() => navigate('/loginscreen')} style={{ fontWeight: 'bold' }}>Log Out</span>

            </div>




        </div>
    </Paper>)
}