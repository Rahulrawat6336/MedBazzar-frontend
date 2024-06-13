const initailState={
  data:{},
  user:{},
  order:{}
}
function RootReducer(state=initailState,action)
{  
 switch(action.type)
 {

  case "ADD_ORDER":
    state.user[action.payload[0]]=action.payload[1]
    return {data:state.data,user:state.user,order:state.order}
 
   case "ADD_USER":
     state.user[action.payload[0]]=action.payload[1]
     return {data:state.data,user:state.user,order:state.order}

   case "ADD_PRODUCT":
     state.data[action.payload[0]]=action.payload[1]
     return {data:state.data,user:state.user,order:state.order}
 case "DELETE_PRODUCT":
       delete state.data[action.payload[0]]
       return {data:state.data,user:state.user,order:state.order}
       
 default:
  return {data:state.data,user:state.user,order:state.order}
 }
}

export default RootReducer