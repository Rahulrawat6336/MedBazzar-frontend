import { Divider, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

export default function ShowCartProduct(props) {

    var navigate = useNavigate()


    var products = useSelector((state) => state.data)
    var keys = Object?.keys(products)
    var products = Object?.values(products)

    const showProducts = () => {
        return products.map((item) => {
            return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}><div >{item.productname}</div><div>Qty:{item.qty}</div></div>
        })
    }

    return (<Paper elevation={2} style={{ display: props.isOpen ? 'flex' : 'none', position: 'absolute', top: 50, right: 70, zIndex: 3 }}>
        <div style={{ display: 'flex', width: 300, height: 'auto', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 'bold' }}>Order Summary</div>
                <div style={{ fontSize: 16, fontWeight: 'bold', marginLeft: "auto" }}>{keys.length}items</div>

            </div>
            <Divider />
            {showProducts()}
            <div onClick={() => navigate('/cart')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#ffff", width: 270, height: 40, background: '#00391c', borderRadius: 10, margin: 10 }}>
                <div>Procced to Cart</div>
            </div>
        </div>
    </Paper>)
}