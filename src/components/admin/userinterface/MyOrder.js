import MaterialTable from "@material-table/core"
import { useEffect, useState } from "react"
import { getData, postData, serverURL } from "../../../services/FetchNodeService"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from "react-redux";
import Header from "./Header";
import MenuBar from "./MenuBar";


export default function MyOrder(){

  const [orderList,setOrderList]=useState([])
  const [orderDetailList,setOrderDetailList]=useState([])
  const [open, setOpen] =useState(false);



  const handleClickOpen = (rowData) => {
    setOpen(true);
    fetchAllOrderdetails(rowData)
  };
  const handleClose = () => {
    setOpen(false);
  };




  var fetchAllOrder=async()=>{

    var result=await getData('myorder/show_all_order',)
    // alert(result.status)
    if(result.status){
      setOrderList(result.data)
    }
  }

  useEffect(function(){
    fetchAllOrder()
  },[])
 
  var fetchAllOrderdetails=async(rowData)=>{

    var result=await postData('myorder/show_all_orderdetails',{orderid:rowData?.orderid})
    // alert(result.status)
    if(result.status){
      setOrderDetailList(result.data)
    }
  }

  useEffect(function(){
    fetchAllOrderdetails()
  },[])




    const showOrder=()=>{

        return (
          <MaterialTable
            title="My Order"
            columns={[
                    { title: 'OrderId', field: 'orderid' },
                  { title: 'Order Date', field: 'orderdate', type: 'numeric' },
                   { title: 'Payment Status', field: 'paymentstatus', },
            ]}


            data={orderList || []}

            actions={[
              {
                icon: 'save',
                tooltip: 'order detail',
                onClick: (event, rowData) => handleClickOpen(rowData)
              },
              
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }





  const showOrderDetails=()=>{

  return (
  
    <Dialog
      open={open}
      onClose={handleClose}
      style={{width:'auto',height:'auto'}}
      fullScreen='true'
      
    >
      <DialogTitle >
        {"ORDER DETAILS"}
      </DialogTitle>
      <DialogContent>
    <MaterialTable
      title=""
      columns={[
        { title: 'TransactionId', field: 'transactionid' },
        { title: 'OrderId', field: 'orderid' },
        { title: 'ProductdetailId', field:'productdetailid'},
        { title: 'Product Name', field: 'productname' },
        { title: 'Price', field: 'price' },
        { title: 'offerprice', field: 'offerprice' },
        { title: 'qty', field: 'qty' }, 
        {title:'Paid Amount',field:'paidamount',render:(rowData)=><>&#8377;{(rowData.offerprice)*(rowData.qty)}</>},
        { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}></img></> },
    
      ]}
      data={orderDetailList || []}    
      actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          // onClick: (event) => alert("You want to add a new row")
        }
      ]}
    />
  
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        
      </DialogActions>
    </Dialog>
);
}





return(
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column'}}>

    <div>
      <Header/>
      <MenuBar/>
    </div>

    <div style={{boxShadow:'none'}}>
        {showOrder()}
        
        </div>

        {showOrderDetails()}

    </div>
)
}