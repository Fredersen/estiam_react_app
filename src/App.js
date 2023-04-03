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

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([...products]);
    const [showLogin, setShowLogin] = useState(false);

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
                    </Routes>
                    <Footer />
                </div>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default App;
