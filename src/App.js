
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import Home from "./screens/userinterface/Home";
import ProductDetail from "./screens/userinterface/ProductDetail";
import FilterPage from "./screens/userinterface/FilterPage";
import Cart from "./screens/userinterface/Cart";
import PlusMinusComponent from "./components/admin/userinterface/PlusMinusComponent";
import LogInScreen from "./screens/userinterface/LogInScreen";
import GetOTP from "./components/admin/userinterface/GetOTP";
import AddAddress from "./components/admin/userinterface/AddAddress";
import DeliveryAddress from "./components/admin/userinterface/DeliveryAddress";
import MyOrder from "./components/admin/userinterface/MyOrder";


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route element={<AdminLogin />} path={'/adminlogin'} />
          <Route element={<AdminDashboard />} path={'/admindashboard/*'} />
          <Route element={<Home />} path={'/home'} />
          <Route element={<ProductDetail />} path={'/productdetail'} />
          {/* <Route element={<FilterPage/>} path={'/filterpage'} /> */}
          <Route element={<Cart />} path={'/cart'} />
          <Route element={<PlusMinusComponent />} path={'/plusminuscomponent'} />
          <Route element={<LogInScreen />} path={'/loginscreen'} />
          {/* <Route element={<GetOTP/>} path={'/getOTP'} /> */}
          <Route element={<DeliveryAddress/>} path={'/address'}/>
          <Route element={<AddAddress/>} path={'/addaddress'} />

          <Route element={<FilterPage />} path={`/filterpage/${'*'}`} />
          <Route element={<MyOrder />} path={'/myorder'} />
   
        </Routes>
      </Router>
    </div>
  );
}

export default App;
