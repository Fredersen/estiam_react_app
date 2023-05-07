import Carousel from "components/carousel/Carousel";
import Title from "components/title/Title";
import ProductCard from "components/productCard/ProductCard";
import './Home.css';
import {useEffect, useState} from "react";
import featuredProductApi from "services/featuredProductApi";
import productApi from "services/productApi";
import Loading from "components/loading/Loading";

export default function Home () {
    const [featuredProductList, setFeaturedProductList] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const fetchedFeaturedProducts = await featuredProductApi.findAll();
                setFeaturedProductList(fetchedFeaturedProducts);

                const productsByFeature = [];

                for (const featuredProduct of fetchedFeaturedProducts) {
                    productsByFeature[featuredProduct.name] = [];

                    for (const productID of featuredProduct.products) {
                        const fetchedProduct = await productApi.find(productID);
                        productsByFeature[featuredProduct.name].push(fetchedProduct);
                    }}
                setProductsByCategory(productsByFeature);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchFeaturedProducts();
    }, []);

    return (
        <>
            <Carousel />
            <div className="main-container">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {featuredProductList.map((featuredProduct, index) => (
                            <span key={index}>
                                <Title title={featuredProduct.name} />
                                <div className="product-card-container">
                                    {productsByCategory[featuredProduct.name].map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </span>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}