import './ProductItem.css'
import Title from "../../components/title/Title";
import {useState, useContext } from "react";
import {useParams} from "react-router-dom";
import CartContext from "../../contexts/CartContext";

export default function ProductItem() {
    const { id } = useParams();
    const product = {
        id: parseInt(id),
        name: 'Collier en argent',
        price: 29.99,
        date: '2022-01-01',
        description:
            'Collier en argent 925/1000e, avec une chaîne de 45 cm et un pendentif en forme de coeur de 2 cm de diamètre. Ce collier est livré dans une pochette en organza.',
        image:
            'https://cdn-fsly.yottaa.net/60a2795ad93140a5dc7453d7/fr.pandora.net/v~4b.f/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwdb236c34/productimages/main/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5&yocs=8_d_',
    };

    const { cart, addItemToCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);

    function handleAddToCart() {
        product.quantity = quantity;
        addItemToCart(product);
    }
    function handleQuantityChange(event) {
        setQuantity(Number(event.target.value));
    }

    return (
        <div className="container product-item-container">
            <Title title={product.name} />
            <div className="product-item">
                <div className="product-item-image">
                    <img src={product.image} alt="image" />
                </div>
                <div className="product-item-content">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price} €</p>
                    <select name="quantity" id="quantity" value={quantity} onChange={handleQuantityChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={handleAddToCart}>Ajouter au panier</button>
                </div>
            </div>
        </div>
    );
}