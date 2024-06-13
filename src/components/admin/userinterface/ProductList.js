
import React from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinusComponent from './PlusMinusComponent';
import { postData, serverURL } from '../../../services/FetchNodeService';
import logo from '../../../assests/logo.png'

export default function ProductList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const productFromRedux = useSelector(state => state.data);
  const productRedux = Object.values(productFromRedux);

  const handleChange = (v, item) => {
    if (v > 0) {
      item['qty'] = v;
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] });
    }

    props.setPageRefresh(!props.pageRefresh);
  };

  const handleProductDetail = item => {
    navigate('/productdetail', { state: { data: item } });
  };

  const showProduct = () => {
    return props.data.map(item => (
      <div key={item.productdetailid} style={{ height: '', width: matches?'20%':'100%', marginRight: '3%', border: 'solid white', marginTop: '2%' }}>
        <BookmarkAddOutlinedIcon style={{ marginLeft: 'auto', display: 'flex' }} />
        <img onClick={() => handleProductDetail(item)} src={`${serverURL}/images/${item.picture}`} style={{ width: matches?'65%':'50%', aspectRatio: 3 / 3, borderRadius: 0, height: 'auto',marginLeft:matches?'':'20%' }} />
        <img src={logo} style={{ height: 22, width: 55, display: 'flex', marginLeft: matches?'55%':'80%' }} />
        <div style={{
          fontSize: matches ? '1.0em' : '1.1em',
          display: 'flex',
          fontWeight: 'bold',
          margin: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}>
          {item.description.length <= 20 ? (
            <div>
              {item.description}
              <div>&nbsp;</div>
            </div>
          ) : (
            item.description
          )}
        </div>
        <div>
          {item.weight} {item.weighttype}
        </div>
        {item.offerprice === 0 ? (
          <div style={{ fontSize: 20, fontWeight: 'bolder' }}>
            &#8377;{item.price}
          </div>
        ) : (
          <div>
            <span style={{ fontFamily: 'kanit', fontSize:matches?20:'1.3em', fontWeight: 'bold' }}> &#8377;{item.offerprice} </span>
            <span style={{ fontFamily: 'kanit', fontSize:matches? 15:'1.2em', color: 'gray' }}> <s>MRP &#8377;{item.price}</s> </span>
            <span style={{ fontFamily: 'kanit', fontSize: 11, background: '#f5a623', padding: 3, borderRadius: 15, color: '#6a7d27' }}> 20% Off </span>
          </div>
        )}

        <Divider style={{ width: matches?200:'auto', background: '#95a5a6',marginTop:5,marginBottom:3 }} />
        <div style={{ display: 'flex', fontSize: matches?13:18, alignItems: 'center' }}><AccessTimeIcon style={{ height: 15, width: 15, marginRight: 5, color: 'green' }} />Delivery within <span style={{ fontWeight: 'bold' }}>1-3 days</span></div>
        <div style={{ fontSize: 13, marginTop: 5, fontWeight: '#535c68', display: 'flex', alignItems: 'center' }}>
          <PlusMinusComponent qty={productFromRedux[item.productdetailid]?.qty === undefined ? 0 : productFromRedux[item.productdetailid]?.qty} onChange={v => handleChange(v, item)} width={matches?80:120} />
          <Button style={{ marginLeft: 20, height: 25, width: matches?80:120, background: '#2C3A47' }} variant="contained">Buy</Button>
        </div>
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', right: '50%', marginLeft: matches ? '-10%' : '2%', justifyContent: 'flex-start', height: '100%', flexDirection: 'column', width: 'auto', marginTop: '3%', background: '#fff' }}>
      <span>All Product</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'stretch', height: 'auto', flexDirection: 'row' }}>
        {showProduct()}
      </div>
    </div>
  );
}
