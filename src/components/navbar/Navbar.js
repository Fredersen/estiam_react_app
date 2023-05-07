import './Navbar.css';
import Search from "../search/Search";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {IoLogoFoursquare} from "react-icons/io";
import Category from "../category/Category";
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {useContext, useEffect, useState} from "react";
import CartContext from "contexts/CartContext";
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import categoryApi from "services/categoryApi";
import authApi from "services/authApi";
import SubMenu from "../subMenu/SubMenu";

export default function Navbar({ handleSearch, showLogin, setShowLogin }) {
    const { cart } = useContext(CartContext);
    const [showRegister, setShowRegister] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showSubMenu, setShowSubMenu] = useState(false);

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

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
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
                    <button
                        onClick={() => !authApi.isAuthenticated() ? toggleLogin() : toggleSubMenu()}
                        className="profile-icon-button"
                    >
                        <CgProfile />
                    </button>
                </div>
            </nav>
            <div className="nav-category">
                <ul className="nav-category-link">
                    {categories.map((category) => (
                        <li key={category._id}>
                            <Category category={category} />
                        </li>
                    ))}
                </ul>
            </div>
            {showLogin && (
                <div
                    className="login-popup"
                    onClick={handleOutsideClick}
                >
                    <Login setShowRegister={setShowRegister} toggleLogin={toggleLogin} />
                </div>
            )}
            {showRegister && (
                <div
                    className="login-popup"
                    onClick={handleOutsideClick}
                >
                    <Register setShowRegister={setShowRegister} />
                </div>
            )}
            {showSubMenu && <SubMenu setShowSubMenu={setShowSubMenu} />}
        </>
    );
}