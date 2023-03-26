import './ProductItem.css'
import Title from "../../components/title/Title";
import {useState, useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import productApi from "../../services/productApi";
import Loading from "../../components/loading/Loading";

export default function ProductItem() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { cart, addItemToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await productApi.find(id);
                setProduct(fetchedProduct);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchProduct();
    }, []);

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
            {isLoading ? (
                <Loading />) : (    <div className="product-item">
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
            </div>)}
        </div>
    );
}