import './Search.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Search({handleSearch}) {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        { id: 1, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 2, name: 'Bague en argent\n', price: 49.99, date: '2022-01-02', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
    ]);

    function handleSearchData(e) {
        setSearch(e.target.value);
        handleSearch(search);
        navigate("/produits");
    }

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <form className="search">
            <input type="text" placeholder="Search" onChange={handleSearchData} />
            <Link to="/produits">
                <FaSearch />
            </Link>
        </form>
    );
}
