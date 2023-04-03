import { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import orderApi from "../../services/orderApi";
import authApi from "../../services/authApi";
import './MyOrder.css';
import OrderDetail from "../../components/orderDetail/OrderDetail";

const ORDERS_PER_PAGE = 5;

export default function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await orderApi.findByUserId(authApi.retrieveUserId());
                setOrders(fetchedOrders);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchOrders();
    }, []);

    const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
    const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="my-order container">
            <Title title="Mes commandes" />
            {currentOrders.map((order, index) => (
                <div key={index}>
                    <OrderDetail order={order} />
                    <span className="separator"/>
                </div>
            ))}
            {totalPages > 1 && (
                <div className="my-order__pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`my-order__pagination-button ${currentPage === index + 1 ? "my-order__pagination-button--active" : ""}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}