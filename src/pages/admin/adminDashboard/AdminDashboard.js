import './AdminDashboard.css';
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Title from "../../../components/title/Title";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useState} from "react";
import Widget from "../../../components/admin/widget/Widget";
import {EuroSymbolOutlined, SupervisedUserCircleOutlined} from "@mui/icons-material";
import OrderChart from "../../../components/admin/orderChart/OrderChart";

export default function AdminDashboard() {
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-right-content">
                <Title title="Tableau de bord" />
                <div className="admin-right-content-container container">
                    <div className="admin-right-content-widget-container">
                        <Widget title="Nombre de commandes" value={0} percentageIncrease={percentageIncrease} icon={<ShoppingCartIcon />} />
                        <Widget title="Utilisateurs" value={0} percentageIncrease={percentageIncrease} icon={<SupervisedUserCircleOutlined />} />
                        <Widget title="Chiffre d'affaires" value={0} percentageIncrease={percentageIncrease} icon={<EuroSymbolOutlined />} />
                    </div>
                    <div className="admin-right-content-chart-container">
                        <OrderChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
