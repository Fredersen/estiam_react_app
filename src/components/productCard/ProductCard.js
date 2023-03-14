import './ProductCard.css';

export default function ProductCard () {
    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src="https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_" alt="product" />
            </div>
            <div className="product-card-content">
                <h3>Collier en argent</h3>
                <p>Collier en argent 925 avec pendentif en forme de coeur</p>
                <p className="product-card-price">29,99€</p>
            </div>
        </div>
    );
}