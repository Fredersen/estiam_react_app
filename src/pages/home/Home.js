import Carousel from "../../components/carousel/Carousel";
import Title from "../../components/title/Title";
import ProductCard from "../../components/productCard/ProductCard";
import './Home.css';

export default function Home () {
    return (
        <>
            <Carousel />
            <div className="main-container">
                <Title title={"Nos coups de coeurs"} />
                <div className="product-card-container">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <Title title={"Nos nouveautés"} />
                <div className="product-card-container">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </>
    );
}