import './Category.css';
import {Link, useLocation} from "react-router-dom";

export default function Category ({ name, slug }) {
    const pathname = useLocation().pathname;

    return (
        <div className={'category ' + (pathname === `/${slug}` ? 'active' : '')}>
            <Link to={`/${slug}`}>{name}</Link>
        </div>
    );
}