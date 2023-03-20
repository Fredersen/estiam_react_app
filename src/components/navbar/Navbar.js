import './Navbar.css';
import Search from "../search/Search";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {IoLogoFoursquare} from "react-icons/io";
import Category from "../category/Category";
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {useContext} from "react";
import CartContext from "../../contexts/CartContext";

export default function Navbar({ handleSearch }) {
    const CATEGORY_DATA = [
        {
            id: 1,
            title: 'Colliers',
            slug: 'colliers',
        },
        {
            id: 2,
            title: 'Boucles d\'oreilles',
            slug: 'boucles-oreilles',
        },
        {
            id: 3,
            title: 'Bracelets',
            slug: 'bracelets',
        },
        {
            id: 4,
            title: 'Bagues',
            slug: 'bagues',
        },
    ];

    const { cart } = useContext(CartContext);

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
                    <Link to={'/se-connecter'}>
                        <CgProfile />
                    </Link>
                </div>
            </nav>
            <div className="nav-category">
                <ul className="nav-category-link">
                    {CATEGORY_DATA.map((category) => (
                        <li key={category.id}>
                            <Category title={category.title} slug={category.slug} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}