import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Product from "./pages/product/Product";
import ProductItem from "./pages/productItem/ProductItem";
import { useState, useEffect} from "react";
import {CartContextProvider} from "./contexts/CartContext";
import Cart from "./pages/cart/Cart";
import Delivery from "./pages/delivery/Delivery";
import productApi from "./services/productApi";
import OrderSuccess from "./pages/order/OrderSuccess";
import Account from "./pages/account/Account";
import MyOrder from "./pages/myOrder/MyOrder";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import authApi from "./services/authApi";
import AdminRoute from "./components/routes/AdminRoute";
import ProductDashboard from "./pages/admin/product/productDashboard/ProductDashboard";
import CreateProduct from "./pages/admin/product/create/CreateProduct";
import EditProduct from "./pages/admin/product/edit/EditProduct";
import CategoryDashboard from "./pages/admin/category/categoryDashboard/CategoryDashboard";
import CreateCategory from "./pages/admin/category/create/CreateCategory";
import EditCategory from "./pages/admin/category/edit/EditCategory";
import UserDashboard from "./pages/admin/user/userDashboard/UserDashboard";
import EditUser from "./pages/admin/user/edit/EditUser";
import OrderDashboard from "./pages/admin/order/orderDashboard/OrderDashboard";
import EditOrder from "./pages/admin/order/edit/EditOrder";
import CarrierDashboard from "./pages/admin/carrier/carrierDashboard/CarrierDashboard";
import CreateCarrier from "./pages/admin/carrier/create/CreateCarrier";
import EditCarrier from "./pages/admin/carrier/edit/EditCarrier";

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([...products]);
    const [showLogin, setShowLogin] = useState(false);

    authApi.setAxiosToken(window.localStorage.getItem("authToken"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await productApi.findAll();
                setProducts(products);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, []);

    function handleSearch(search) {
        console.log(search);
        if (search !== '') {
            const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredProduct(filteredProducts);
        }
    }

    return (
        <BrowserRouter>
            <CartContextProvider>
                <div className="App">
                    <header className="App-header">
                        <Navbar handleSearch={handleSearch} showLogin={showLogin} setShowLogin={setShowLogin} />
                    </header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/:slug' element={<Product filteredProduct={filteredProduct} />} />
                        <Route path='/produits/:id' element={<ProductItem />} />
                        <Route path='/panier' element={<Cart showLogin={showLogin} setShowLogin={setShowLogin} />} />
                        <Route path ='/livraison' element={
                            <ProtectedRoute>
                                <Delivery />
                            </ProtectedRoute>
                        } />
                        <Route path='/commande/merci/:id' element={
                            <ProtectedRoute>
                                <OrderSuccess />
                            </ProtectedRoute>
                        } />
                        <Route path='/mon-compte' element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        } />
                        <Route path='/mes-commandes' element={
                            <ProtectedRoute>
                                <MyOrder />
                            </ProtectedRoute>
                        } />
                        <Route path='/admin' element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/produits' element={
                            <AdminRoute>
                                <ProductDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/produits/ajout' element={
                            <AdminRoute>
                                <CreateProduct />
                            </AdminRoute>
                        } />
                        <Route path='/admin/produits/modification/:id' element={
                            <AdminRoute>
                                <EditProduct />
                            </AdminRoute>
                        } />
                        <Route path='/admin/categories' element={
                            <AdminRoute>
                                <CategoryDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/categories/ajout' element={
                            <AdminRoute>
                                <CreateCategory />
                            </AdminRoute>
                        } />
                        <Route path='/admin/categories/modification/:id' element={
                            <AdminRoute>
                                <EditCategory />
                            </AdminRoute>
                        } />
                        <Route path='/admin/utilisateurs' element={
                            <AdminRoute>
                                <UserDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/utilisateurs/modification/:id' element={
                            <AdminRoute>
                                <EditUser />
                            </AdminRoute>
                        } />
                        <Route path='/admin/commandes' element={
                            <AdminRoute>
                                <OrderDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/commandes/modification/:id' element={
                            <AdminRoute>
                                <EditOrder />
                            </AdminRoute>
                        } />
                        <Route path='/admin/transporteurs' element={
                            <AdminRoute>
                                <CarrierDashboard />
                            </AdminRoute>
                        } />
                        <Route path='/admin/transporteurs/ajout' element={
                            <AdminRoute>
                                <CreateCarrier />
                            </AdminRoute>
                        } />
                        <Route path='/admin/transporteurs/modification/:id' element={
                            <AdminRoute>
                                <EditCarrier />
                            </AdminRoute>
                        } />
                    </Routes>
                    <Footer />
                </div>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default App;
