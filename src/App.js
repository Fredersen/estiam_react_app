import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Product from "./pages/product/Product";
import ProductItem from "./pages/productItem/ProductItem";
import {useState} from "react";
import {CartContextProvider} from "./contexts/CartContext";
import Cart from "./pages/cart/Cart";
import Delivery from "./pages/delivery/Delivery"

function App() {
    const products = [
        { id: 1, name: 'Collier en argent\n', price: 19.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 2, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 3, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 4, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 5, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 6, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
    ];
    const [filteredProduct, setFilteredProduct] = useState([...products]);

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
                        <Route path='/:slug' element={<Product products={filteredProduct} />} />
                        <Route path='/produits/:id' element={<ProductItem />} />
                        <Route path='/panier' element={<Cart />} />
                        <Route path = '/livraison' element={<Delivery />} />
                    </Routes>
                    <Outlet/>
                    <Footer />
                </div>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default App;
