import './Search.css';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
    return (
        <form className="search">
            <input type="text" placeholder="Search" />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    );
}
