import ProductCard from "components/productCard/ProductCard";
import "./Product.css";
import Title from "components/title/Title";
import {useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import productApi from "services/productApi";
import Loading from "components/loading/Loading";
import categoryApi from "services/categoryApi";

export default function Product({ filteredProduct }) {
    const { slug } = useParams();
    const [sortOrder, setSortOrder] = useState("none");
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const findCategory = await categoryApi.findBySlug(slug);
                setCategory(findCategory);
                if (slug !== 'produits' && !findCategory) {
                    navigate('/');
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, [slug]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (slug !== 'produits') {
                try {
                    const data = await productApi.findByCategory(slug);
                    setProducts(data);
                } catch (error) {
                    console.error(error.response);
                }
            } else {
                setProducts(filteredProduct);
            }
            setIsLoading(false);
        };

        fetchProduct();
    }, [slug, filteredProduct]);

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
                {category ? <Title title={category.name} /> : <Title title={"Tous les produits"} />}
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
            <div className="product-card-container">
                {isLoading ? (
                    <Loading />
                ) : sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="empty-product-message">Il n'y a pas de produits correspondant à votre recherche</p>
                )}
            </div>
        </>
    );
}
