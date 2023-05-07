import './Category.css';
import { Link, useLocation } from "react-router-dom";

export default function Category({ category }) {
    const pathname = useLocation().pathname;

    return (
        <Link to={`/${category.slug}`}>
            <div className={'category ' + (pathname === `/${category.slug}` ? 'active' : '')}>
                {category.name}
            </div>
        </Link>
    );
}