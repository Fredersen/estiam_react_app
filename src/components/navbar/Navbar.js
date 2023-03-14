import './Navbar.css';
import Search from "../search/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoLogoFoursquare } from "react-icons/io";
import Category from "../category/Category";

export default function Navbar() {
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

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <IoLogoFoursquare />
                </div>
                <div className="nav-center">
                    <div className="nav-links">
                        <Search />
                    </div>
                </div>
                <div className="right-logo">
                    <AiOutlineShoppingCart />
                    <CiSettings />
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