import './Navbar.css';
import Search from "../search/Search";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {IoLogoFoursquare} from "react-icons/io";
import Category from "../category/Category";
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../contexts/CartContext";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import axios from "axios";
import categoryApi from "../../services/categoryApi";

export default function Navbar({ handleSearch }) {
    const { cart } = useContext(CartContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await categoryApi.findAll();
                setCategories(categories);
            }
            catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    function handleOutsideClick(e) {
        if (e.target.classList.contains('login-popup')) {
            setShowLogin(false);
            setShowRegister(false);
        }
    }

    const cartCount = Object.values(cart).reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <Link to={'/'}>
                        <IoLogoFoursquare />
                    </Link>
                </div>
                <div className="nav-center">
                    <div className="nav-links">
                        <Search handleSearch={handleSearch} />
                    </div>
                </div>
                <div className="right-logo">
                    <Link to={'/panier'}>
                        <AiOutlineShoppingCart />
                        {cartCount > 0 && (
                            <div className="cart-count">{cartCount}</div>
                        )}
                    </Link>
                    <button onClick={toggleLogin} className="profile-icon-button">
                        <CgProfile />
                    </button>
                </div>
            </nav>
            <div className="nav-category">
                <ul className="nav-category-link">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Category name={category.name} slug={category.slug} />
                        </li>
                    ))}
                </ul>
            </div>
            {showLogin && (
                <div
                    className="login-popup"
                    onClick={handleOutsideClick}
                >
                    <Login setShowRegister={setShowRegister} />
                </div>
            )}
            {showRegister && (
                <div
                    className="login-popup"
                    onClick={handleOutsideClick}
                >
                    <Register />
                </div>
            )}
        </>
    );
}