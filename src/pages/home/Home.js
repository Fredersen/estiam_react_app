import Carousel from "../../components/carousel/Carousel";
import Title from "../../components/title/Title";
import ProductCard from "../../components/productCard/ProductCard";
import './Home.css';
import {useState} from "react";

export default function Home () {
    const product = { id: 1, name: 'Collier en argent\n', price: 29.99, date: '2022-01-01', description: 'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.', image: 'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_' };

    return (
        <>
            <Carousel />
            <div className="main-container">
                <Title title={"Nos coups de coeurs"} />
                <div className="product-card-container">
                    <ProductCard product={product} />
                    <ProductCard product={product} />
                    <ProductCard product={product} />
                </div>
                <Title title={"Nos nouveautés"} />
                <div className="product-card-container">
                    <ProductCard product={product} />
                    <ProductCard product={product} />
                    <ProductCard product={product} />
                </div>
            </div>
        </>
    );
}