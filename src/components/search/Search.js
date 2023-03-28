import './Search.css';
import { FaSearch } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';

export default function Search({handleSearch}) {
    const navigate = useNavigate();

    function handleSearchData(e) {
        handleSearch(e.target.value);
        navigate("/produits");
    }

    return (
        <form className="search">
            <input type="text" placeholder="Recherche" onChange={handleSearchData} />
            <Link to="/produits">
                <FaSearch />
            </Link>
        </form>
    );
}
