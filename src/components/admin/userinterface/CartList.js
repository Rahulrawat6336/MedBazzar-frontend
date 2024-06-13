import React from 'react';
import { Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import PlusMinusComponent from './PlusMinusComponent';
import DeliveryAddress from './DeliveryAddress';
import { serverURL } from '../../../services/FetchNodeService';

export default function CartList(props) {
  const dispatch = useDispatch();

  const productFromRedux = props?.product;
  const productdetail = Object.values(productFromRedux);
  const keys = Object?.keys(productFromRedux);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (v, item) => {
    if (v > 0) {
      item['qty'] = v;
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };

  const showCart = () => {
    return productdetail?.map(item => (
      <div key={item.productdetailid}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: matches ? '0.9em' : '0.5em', alignItems: 'flex-start', marginTop: matches ? '0.5%' : '-1%', border: matches ? '1px solid #dfe6e9' : ' ', width: 'auto' }}>
          <img src={`${serverURL}/images/${item.picture}`} style={{ width: '13%', height: '8%', marginTop: '5%', marginLeft: matches ? '5%' : '', marginRight: '3%' }} />
          <div style={{ display: 'flex', padding: '0.9em', width: '100%', alignItems: 'start', flexDirection: 'column', marginTop: '2%', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 'bolder', width: matches ? '28rem' : '18rem', fontSize: '90%', overflow: 'hidden', textOverflow: 'ellipsis' }}> {item.productsubname} {item.description} {item.weight} {item.weighttype}</span>
            <span style={{ color: 'black', width: 'auto', fontSize: '75%', marginTop: '4%' }}> {item.productsubname} | {item.weight} {item.weighttype}</span>
            <span style={{ fontWeight: 'bold', width: 'auto', fontSize: '90%', marginTop: '4%' }}>
              {item.offerprice == 0 ? (
                <div style={{ fontSize: 22, fontWeight: 'bolder' }}>
                  &#8377;{item.price}
                </div>
              ) : (
                <div>
                  <span style={{ fontFamily: 'kanit', fontSize: 22, fontWeight: 'bold' }}> &#8377;{item.offerprice} </span>
                  <span style={{ fontFamily: 'kanit', fontSize: 15, color: 'gray' }}> <s>MRP &#8377;{item.price}</s> </span>
                  <span style={{ fontFamily: 'kanit', fontSize: 11, background: '#f5a623', padding: 3, borderRadius: 15, color: '#6a7d27' }}> 20% Off </span>
                </div>
              )}
            </span>
            <div style={{ width: 300 }}>
              <PlusMinusComponent qty={item?.qty} onChange={(v) => handleChange(v, item)} width={'20%'} />
            </div>
            <span style={{ display: 'flex', width: 'auto', fontSize: '75%', alignItems: 'center', marginTop: '4%' }}><AccessTimeIcon style={{ height: 15, width: 15, marginRight: 5, color: 'red' }} />Delivery within <span style={{ fontWeight: 'bold' }}> &nbsp; 1-3 days</span></span>
            <Divider style={{ marginTop: '6%', width: '100%' }} variant="fullWidth" />
            <div style={{ marginTop: '4%', width: 'auto', display: 'flex', alignItems: 'center', marginBottom: '5%' }}>
              <span style={{ color: 'red', fontSize: '70%', display: 'flex', alignItems: 'center' }}><DeleteForeverOutlinedIcon style={{ width: 'auto' }} />Remove</span>
              <span style={{ fontSize: '70%', display: 'flex', alignItems: 'center', marginLeft: '10%' }}> <BookmarkAddOutlinedIcon /> Add to Favourites</span>
            </div>
          </div>
        </div>
        {matches ? <></> : <Divider style={{ height: 0.1, background: '#95a5a6', width: 'auto', opacity: '0.5', zIndex: 2, marginTop: '-6%' }} />}
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', width: 'auto', flexDirection: 'column', marginLeft: matches ? '3%' : '2%' }}>
     
      <div style={{ fontWeight: 'bold', fontSize: matches ? '160%' : '120%' }}>{matches ? <>{keys?.length} items in your Cart</> : <>Your Order</>}</div>
      <div style={{ marginTop: '5%' }}>
        <span style={{ fontWeight: 'lighter', fontSize: '90%' }}>Prescription Not Required</span>
        {showCart()}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '3%' }}><AddBoxOutlinedIcon /><span style={{ fontWeight: 'bold', marginLeft: '2%' }}>Add more items</span></div>
    </div>
  );
}
