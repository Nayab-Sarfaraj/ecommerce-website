import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WebFont from "webfontloader";
import { fetchProducts } from "./Store/Slice/productSlice";
import { FetchProfile } from "./Store/Slice/userSlice";
import Home from "./components/Home";
import Products from "./components/Products";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Search from "./components/Search";
import SingleProduct from "./components/SingleProduct";
import EditProfile from "./components/User/EditProfile";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile";
import UpdatePassword from "./components/User/UpdatePassword";
import UserOptions from "./components/User/UserOptions";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const user = useSelector(state => state.user.data.user)
  console.log(user)
  useEffect(() => {
    const keyword = ""
    const currentPage = 1
    dispatch(fetchProducts({ keyword, currentPage }));
    dispatch(FetchProfile())
    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif"],
      },
    });
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/signup" element={<LoginSignUp />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<EditProfile />} ></Route>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
