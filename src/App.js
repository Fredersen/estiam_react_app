import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Product from "./pages/product/Product";
import ProductItem from "./pages/productItem/ProductItem";
import { useState, useEffect } from "react";
import {CartContextProvider} from "./contexts/CartContext";
import Cart from "./pages/cart/Cart";
import Delivery from "./pages/delivery/Delivery";
import productApi from "./services/productApi";

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([...products]);

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
                        <Navbar handleSearch={handleSearch} />
                    </header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/:slug' element={<Product filteredProduct={filteredProduct} />} />
                        <Route path='/produits/:id' element={<ProductItem />} />
                        <Route path='/panier' element={<Cart />} />
                        <Route path ='/livraison' element={<Delivery />} />
                    </Routes>
                    <Outlet/>
                    <Footer />
                </div>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default App;
