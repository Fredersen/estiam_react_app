import { Routes, Route, BrowserRouter,Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";

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
                    </Routes>
                </BrowserRouter>
                <Outlet/>
                <Footer />
            </div>
        </>
    );
}

export default App;
