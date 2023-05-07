import './AdminDashboard.css';
import Title from "components/title/Title";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useEffect, useState} from "react";
import Widget from "components/admin/widget/Widget";
import {EuroSymbolOutlined, SupervisedUserCircleOutlined} from "@mui/icons-material";
import OrderChart from "components/admin/orderChart/OrderChart";
import orderApi from "services/orderApi";
import userApi from "services/userApi";
import AdminLayout from "components/layout/AdminLayout";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [orderFromLastMonth, setOrderFromLastMonth] = useState([]);
    const [orderFromThisMonth, setOrderFromThisMonth] = useState([]);
    const [revenueFromLastMonth, setRevenueFromLastMonth] = useState(0);
    const [revenueFromThisMonth, setRevenueFromThisMonth] = useState(0);
    const [orderPercentageIncrease, setOrderPercentageIncrease] = useState(0);
    const [revenuePercentageIncrease, setRevenuePercentageIncrease] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await orderApi.findAll();
            setOrders(orders);
            getOrderFromLastMonth();
            getOrderFromThisMonth();
        };

        const fetchUsers = async () => {
            const users = await userApi.findAll();
            setUsers(users);
        }

        fetchUsers();
        fetchOrders();
    }, []);

    useEffect(() => {
        getOrderFromLastMonth();
        getOrderFromThisMonth();
        calculateOrderPercentageIncrease();
    }, [orders]);

    useEffect(() => {
        getRevenueFromThisMonth();
        getRevenueFromLastMonth();
        calculateRevenuePercentageIncrease();
    }, [orderFromThisMonth]);

    function getOrderFromLastMonth() {
        const ordersFromLastMonth = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear()  && order.state === 'paid';
        });
        setOrderFromLastMonth(ordersFromLastMonth);
    }

    function getOrderFromThisMonth() {
        const ordersFromThisMonth = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const thisMonth = new Date();
            return orderDate.getMonth() === thisMonth.getMonth() && orderDate.getFullYear() === thisMonth.getFullYear() && order.state === 'paid';
        });
        setOrderFromThisMonth(ordersFromThisMonth);
    }

    function getRevenueFromThisMonth() {
        let revenue = 0;
        orderFromThisMonth.forEach(order => {
            order.orderDetails.forEach(orderDetail => {
                revenue += orderDetail.price * orderDetail.quantity;
            });
        });
        revenue = revenue.toFixed(2);
        setRevenueFromThisMonth(revenue);
    }

    function getRevenueFromLastMonth() {
        let revenue = 0;
        orderFromLastMonth.forEach(order => {
            order.orderDetails.forEach(orderDetail => {
                revenue += orderDetail.price * orderDetail.quantity;
            });
        });
        setRevenueFromLastMonth(revenue);
    }

    function calculateOrderPercentageIncrease() {
        const percentageIncrease = calculatePercentageIncrease(orderFromLastMonth.length, orderFromThisMonth.length);
        setOrderPercentageIncrease(percentageIncrease);
    }

    function calculateRevenuePercentageIncrease() {
        const percentageIncrease = calculatePercentageIncrease(revenueFromLastMonth, revenueFromThisMonth);
        setRevenuePercentageIncrease(percentageIncrease);
    }

    function calculatePercentageIncrease(valueFromLastMonth, valueFromThisMonth) {
        if(valueFromLastMonth === 0) {
            return 100;
        }
        return (valueFromThisMonth - valueFromLastMonth) / valueFromLastMonth * 100;
    }

 return(<>
            <Title title="Tableau de bord" />
            <div className="admin-right-content-container container">
                <div className="admin-right-content-widget-container">
                    <Widget title="Nombre de commandes" value={orderFromThisMonth.length} percentageIncrease={orderPercentageIncrease} icon={<ShoppingCartIcon />} />
                    <Widget title="Utilisateurs" value={users.length} percentageIncrease={null} icon={<SupervisedUserCircleOutlined />} />
                    <Widget title="Chiffre d'affaires" value={revenueFromThisMonth} percentageIncrease={revenuePercentageIncrease} icon={<EuroSymbolOutlined />} />
                </div>
                <div className="admin-right-content-chart-container">
                    <OrderChart orderFromThisMonth={orderFromThisMonth} />
                </div>
            </div>
   </>    );
}
