import ProductCard from "../../components/productCard/ProductCard";
import './Product.css';
import Title from "../../components/title/Title";
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';


export default function Product() {
    const { slug } = useParams();
    const [sortOrder, setSortOrder] = useState('none');
    const [sortingDone, setSortingDone] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 2, name: 'Collier en argent\n', price: 49.99, date: '2022-01-02', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 3, name: 'Collier en argent\n', price: 39.99, date: '2022-01-04', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
        { id: 4, name: 'Collier en argent\n', price: 19.99, date: '2022-01-03', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' },
    ]);

    function handleSortChange(event) {
        setSortOrder(event.target.value);
        setSortingDone(!sortingDone);
    }

    function sortProducts(a, b) {
        if (sortOrder === 'price-asc') {
            return a.price - b.price;
        } else if (sortOrder === 'price-desc') {
            return b.price - a.price;
        } else if (sortOrder === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortOrder === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        } else {
            return 0;
        }
    }

    const sortedProducts = products.slice().sort(sortProducts);

    return (
        <>
            <div className="container">
                { slug ? <Title title={slug} /> : <Title title={"Tous les produits"} />}
                <div className="select-products-container">
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="none">Trier par...</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="date-asc">Date croissante</option>
                        <option value="date-desc">Date décroissante</option>
                    </select>
                </div>
            </div>
            <div className={"product-card-container " + (sortingDone ? "exiting" : "")}>
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}