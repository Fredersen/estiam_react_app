import './ProductCard.css';

export default function ProductCard ({ product }) {
    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src={ product.image } alt="product" />
            </div>
            <div className="product-card-content">
                <h3>{ product.name }</h3>
                <p>{ product.description }</p>
                <p className="product-card-price">{ product.price } €</p>
            </div>
        </div>
    );
}