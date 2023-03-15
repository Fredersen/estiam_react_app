import ProductCard from "../../components/productCard/ProductCard";
import "./Product.css";
import Title from "../../components/title/Title";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

export default function Product({ products }) {
    const { slug } = useParams();
    const [sortOrder, setSortOrder] = useState("none");

    function handleSortChange(event) {
        setSortOrder(event.target.value);
    }

    function sortProducts(a, b) {
        if (sortOrder === "price-asc") return a.price - b.price;
        if (sortOrder === "price-desc") return b.price - a.price;
        if (sortOrder === "date-asc") return new Date(a.date) - new Date(b.date);
        if (sortOrder === "date-desc") return new Date(b.date) - new Date(a.date);

        return 0;
    }

    const sortedProducts = products.slice().sort(sortProducts);

    return (
        <>
            <div className="container">
                {slug ? <Title title={slug} /> : <Title title={"Tous les produits"} />}
                {sortedProducts.length > 0 && (
                    <div className="select-products-container">
                        <select value={sortOrder} onChange={handleSortChange}>
                            <option value="none">Trier par...</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="date-asc">Date croissante</option>
                            <option value="date-desc">Date décroissante</option>
                        </select>
                    </div>
                )}
            </div>
            <div className={"product-card-container"}>
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>Il n'y a pas de produits correspondant à votre recherche</p>
                )}
            </div>
        </>
    );
}
