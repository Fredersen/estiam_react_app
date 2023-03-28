import Title from "../../components/title/Title";
import { useParams, useNavigate  } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import orderApi from "../../services/orderApi";
import './OrderSuccess.css'
import authApi from "../../services/authApi";
import CartContext from "../../contexts/CartContext";

export default function OrderSuccess() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    useEffect( () => {
        const fetchOrder = async () => {
            try {
                const response = await orderApi.findByServiceId(id);
                setOrder(response[0]);
                checkCredentials(response[0]);
            } catch (error) {
                console.error("Erreur lors de la récupération de la commande :", error);
            }
        };

        fetchOrder();
    }, [id]);

    async function checkCredentials(order) {
        if (!order || order.stripeSessionId !== id || order.user !== authApi.retrieveUserId()) {
            navigate('/');
        } else {
            await orderApi.update(order._id, { state: 'paid' });
            clearCart();
        }
    }

    const formatPrice = (price) => {
        return price.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        });
    }

    return (
        <div className="order-success-container">
            <Title title="Confirmation de commande" />
            <div className="order-success-wrapper">
                <div className="order-success-items">
                    {order && order.orderDetails && (
                        order.orderDetails.map((item) => (
                            <div className="order-success-item" key={item._id}>
                                <div className="order-success-item-image">
                                    <img src={item.product.image} alt={item.product.name} />
                                </div>
                                <div className="order-success-item-details">
                                    <div className="order-success-item-details-left">
                                        <div className="order-success-item-title">{item.product.name}</div>
                                        <div className="order-success-item-price">{formatPrice(item.price)}</div>
                                        <div className="order-success-item-quantity">
                                            <span className="order-success-item-quantity-value">Quantité : {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="order-success-item-details-right">
                                        <div className="order-success-item-total-price">{formatPrice(item.total)}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="order-success-message">
                    <h2 className="order-success-title">Merci pour votre commande !</h2>
                    {order && order.address && (
                        <div className="order-summary">
                            <h3 className="order-summary-title">Récapitulatif de votre commande</h3>
                            <p className="order-id">Numéro de commande : {order._id}</p>
                            <p className="order-date">Date de commande : {new Date(order.createdAt).toLocaleString()}</p>
                            <p className="carrier-info">Transporteur : {order.carrierName}</p>
                            <p className="shipping-fee">Frais de port : {order.carrierPrice}€</p>
                            <h4 className="delivery-address-title">Adresse de livraison</h4>
                            <p className="delivery-address">
                                {order.address.civility} {order.address.firstName} {order.address.name}
                            </p>
                            <p className="delivery-address-details">
                                {order.address.address}, {order.address.postalCode} {order.address.city}
                            </p>
                            <p className="delivery-phone">Téléphone : {order.address.phone}</p>
                            <p className="delivery-email">Email : {order.address.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}