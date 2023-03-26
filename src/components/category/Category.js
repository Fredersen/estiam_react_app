import './Category.css';
import {Link, useLocation} from "react-router-dom";

export default function Category ({ category }) {
    const pathname = useLocation().pathname;

    return (
        <div className={'category ' + (pathname === `/${category.slug}` ? 'active' : '')}>
            <Link to={`/${category.slug}`}>{category.name}</Link>
        </div>
    );
}