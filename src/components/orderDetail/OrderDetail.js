import './OrderDetail.css';
import {useEffect, useState} from "react";

export default function OrderDetail({ order }) {
    const [orderState, setOrderState] = useState('');

    useEffect(() => {
        handleOrderState(order);
    }, []);

    const handleOrderState = (order) => {
        switch (order.state) {
            case 'paid':
                setOrderState('Payée');
                break;
            case 'pending':
                setOrderState('En attente de paiement');
                break;
            case 'canceled':
                setOrderState('Annulée');
                break;
            case 'shipped':
                setOrderState('Expédiée');
                break;
            case 'delivered':
                setOrderState('Livrée');
                break;
            default:
                setOrderState('En attente de paiement');
        }
    }

    return (
        <div className="my-order-product-container">
            <div className="my-order-product-items">
                <div className="my-order-order-details-title">
                    <h2><span>Commande : </span>{order._id}</h2>
                </div>
                {order.orderDetails.map((orderDetail) => (
                    <div className="my-order-product-item" key={orderDetail._id}>
                        <div className="my-order-product-item-image">
                            <img src={orderDetail.product.image} alt={orderDetail.product.name} />
                        </div>
                        <div className="my-order-product-item-details">
                            <div className="my-order-product-item-details-left">
                                <div className="my-order-product-item-title">{orderDetail.product.name}</div>
                                <div className="my-order-product-item-price">{orderDetail.price} €</div>
                                <div className="my-order-product-item-quantity">
                                    Quantité : {orderDetail.quantity}
                                </div>
                            </div>
                            <div className="my-order-product-item-details-right">
                                <div className="my-order-product-item-total">
                                    Total : {orderDetail.price * orderDetail.quantity} €
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="my-order-order-details">
                <div className="my-order-order-details-sub-total">
                    <span className="my-order-order-details-sub-total-label">{order.orderDetails.length} article(s)</span>
                    <span className="my-order-order-details-sub-total-value">{order.orderDetails.reduce((total, item) => {
                        return total + item.price * item.quantity;
                    }, 0)} €</span>
                </div>
                <div className="my-order-order-details-shipping">
                    <span className="my-order-order-details-shipping-label">Frais de livraisons</span>
                    <span className="my-order-order-details-shipping-value">{order.carrierPrice} €</span>
                </div>
                <div className="my-order-order-details-total">
                    <span className="my-order-order-details-total-label">Total</span>
                    <span className="my-order-order-details-total-value">{(order.orderDetails.reduce((total, item) => {
                        return total + item.price * item.quantity;
                    }, 0) + order.carrierPrice).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                    })}</span>
                </div>
                <div className="my-order-order-details-status">
                    <span className="my-order-order-details-status-label">État de la commande</span>
                    <span className="my-order-order-details-status-value">{orderState}</span>
                </div>
                <div className="my-order-order-details-date">
                    <span className="my-order-order-details-date-label">Date de la commande</span>
                    <span className="my-order-order-details-date-value">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="my-order-order-details-address">
                    <span className="my-order-order-details-address-label">Adresse de livraison</span>
                    <span className="my-order-order-details-address-value">{order.address.address}, {order.address.postalCode} {order.address.city}</span>
                </div>
            </div>
        </div>
    );
}