import { Routes, Route, BrowserRouter,Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Product from "./pages/product/Product";

function App() {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                </header>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/produits/:slug' element={<Product />} />
                        <Route path='/produits' element={<Product />} />
                    </Routes>
                </BrowserRouter>
                <Outlet/>
                <Footer />
            </div>
        </>
    );
}

export default App;
