import React, { useContext } from 'react';
import CartContext from "contexts/CartContext";
import './Cart.css';
import {Link} from "react-router-dom";
import Title from "components/title/Title";
import authApi from "services/authApi";

export default function Cart({ showLogin, setShowLogin }) {
    const { cart, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

    let deliveryCost = 5.00;

    const formatPrice = (price) => {
        return price.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        });
    }

    const cartItems = Object.values(cart);

    let totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0);

    let totalPriceAndDelivery = totalPrice + deliveryCost;
    totalPriceAndDelivery = formatPrice(totalPriceAndDelivery);
    cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
    totalPrice = formatPrice(totalPrice);

    const increment = (id) => {
        updateItemQuantity(id, cart[id].quantity + 1);
    };

    const decrement = (id) => {
        const newQuantity = cart[id].quantity - 1;
        if (newQuantity > 0) {
            updateItemQuantity(id, newQuantity);
        }
    };

    const remove = (id) => {
        removeItemFromCart(id);
    };

    return (
        <div className="cart">
            <Title title="Panier" />
            {cartItems.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-details-left">
                                        <div className="cart-item-title">{item.name}</div>
                                        <div className="cart-item-price">{formatPrice(item.price)}</div>
                                        <div className="cart-item-quantity">
                                            <button className="cart-item-quantity-button" onClick={() => decrement(item._id)}>-</button>
                                            <span className="cart-item-quantity-value">{item.quantity}</span>
                                            <button className="cart-item-quantity-button" onClick={() => increment(item._id)}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart-item-details-right">
                                        <div className="cart-item-total-price">{formatPrice(item.price * item.quantity)}</div>
                                        <button className="cart-item-remove-button" onClick={() => remove(item._id)}>Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-details">
                        <div className="order-details-title">
                            <h2 className="order-details-title-text">Récapitulatif commande</h2>
                        </div>
                        <div className="order-details-sub-total">
                            <span className="order-details-sub-total-label">Sous-total ({cartItems.length > 1 ? `${cartItems.length} articles` : `${cartItems.length} article`})</span>
                            <span className="order-details-sub-total-value">{totalPrice}</span>
                        </div>
                        <div className="order-details-shipping">
                            <span className="order-details-shipping-label">Frais de livraisons estimés</span>
                            <span className="order-details-shipping-value">{deliveryCost}</span>
                        </div>
                        <div className="order-details-total-price">
                            <span className="order-details-total-price-label">Total</span>
                            <span className="order-details-total-price-value">{ totalPriceAndDelivery }</span>
                        </div>
                        {authApi.isAuthenticated() ? (
                            <Link to={'/livraison'}>
                                <button className="order-details-button">Passer la commande</button>
                            </Link>
                        ) : (
                            <div className="order-details-button-container">
                                <button className="order-details-button" onClick={() => setShowLogin(true)}>Passer la commande</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="empty-cart-message">Vous n'avez pas encore d'articles dans votre panier.</p>
            )}
        </div>
    );
}
