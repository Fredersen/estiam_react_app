import Title from "../../components/title/Title";
import { useParams, useNavigate  } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import orderApi from "../../services/orderApi";
import './OrderSuccess.css'
import authApi from "../../services/authApi";
import CartContext from "../../contexts/CartContext";
import OrderDetail from "../../components/orderDetail/OrderDetail";

export default function OrderSuccess() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    useEffect( () => {
        const fetchOrder = async () => {
            try {
                const response = await orderApi.findByServiceId(id);
                const updatedOrder = await checkCredentials(response[0]);
                setOrder(updatedOrder);
                clearCart();

            } catch (error) {
                console.error("Erreur lors de la récupération de la commande :", error);
            }
        };

        fetchOrder();
    }, []);

    async function checkCredentials(order) {
        if (!order || order.stripeSessionId !== id || order.user !== authApi.retrieveUserId()) {
        } else {
            return await orderApi.update(order._id, { state: 'paid' });
        }
    }

    return (
        <div className="order-success-container">
            <Title title="Confirmation de commande" />
            {order.orderDetails && <OrderDetail order={order} />}
        </div>
    );
}