import Carousel from "../../components/carousel/Carousel";
import Title from "../../components/title/Title";
import ProductCard from "../../components/productCard/ProductCard";
import './Home.css';
import {useEffect, useState} from "react";
import featuredProductApi from "../../services/featuredProductApi";
import productApi from "../../services/productApi";
import Loading from "../../components/loading/Loading";

export default function Home () {
    const product = { id: 1, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' };
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const data = await featuredProductApi.findAll();
                setFeaturedProducts(data);

                const productsByFeature =[];

                for (const featuredProduct of data) {
                    productsByFeature[featuredProduct.name] = [];

                    for (const product1 of featuredProduct.products) {
                        const product = await productApi.find(product1);
                        productsByFeature[featuredProduct.name].push(product);
                    }
                }
                setProducts(productsByFeature);
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
                        {featuredProducts.map((featuredProduct) => (
                            <>
                                <Title title={featuredProduct.name} />
                                <div className="product-card-container">
                                    {products[featuredProduct.name].map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
