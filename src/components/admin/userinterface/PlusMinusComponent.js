import { useState ,useEffect} from "react"
import { Button,IconButton } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function PlusMinusComponent(props){

    const [value,setValue]=useState(props.qty)

    useEffect(function(){
      setValue(props?.qty)
    },[props?.qty])

    const handlePlus=()=>{
        setValue((prev)=>prev+1)
        var v=value
        v=v+1
        props?.onChange(v)
    
    }
    const handleMinus=()=>{
        setValue((prev)=>prev-1)
        var v=value
        v=v-1
       
        props?.onChange(v)
    }


    return(<div style={{display:'flex',width:''}}>
    {value==0?  
     <IconButton style={{width:props.width }} onClick={handlePlus} color="primary" aria-label="add to shopping cart">
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<AddShoppingCartIcon />}
                    size='small'
                    style={{color:'#00391C',width:props?.width,height:25}}
                  >
                    ADD
                  </Button>
                </IconButton>:  
    <div style={{alignItems:'center',marginTop:10,display:'flex', justifyContent:'space-evenly', background:'#00391c',width:props?.width,height:25,  borderRadius:4}}>
     
      <span onClick={handleMinus} style={{cursor:'pointer', color:'#fff',fontSize:16,fontWeight:'bold'}}>-</span> 
      <span style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>{value}</span>
      <span onClick={handlePlus} style={{cursor:'pointer',color:'#fff',fontSize:16,fontWeight:'bold'}}>+</span>

    </div>}
  </div>)
}