import './Category.css';
import {Link, useLocation} from "react-router-dom";

export default function Category ({ title, slug }) {
    const pathname = useLocation().pathname;

    return (
        <div className={'category ' + (pathname === `/${slug}` ? 'active' : '')}>
            <Link to={`/${slug}`}>{title}</Link>
        </div>
    );
}