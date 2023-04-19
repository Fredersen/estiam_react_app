import './Sidebar.css'
import {Link, useNavigate} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import authApi from "../../../services/authApi";
import {PhotoCamera} from "@mui/icons-material";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authApi.logout();
        navigate('/');
    };

    return (
        <div className="admin-left-menu">
            <div className="admin-left-menu-item">
                <Link to={"/"}>
                    <div className={'admin-left-menu-item-title'}>
                        <HomeIcon /> Retour au site
                    </div>
                </Link>
                <Link to={"/admin"}>
                    <div className={'admin-left-menu-item-title'}>
                        <DashboardIcon /> Tableau de bord
                    </div>
                </Link>
                <Link to={"/admin/produits"}>
                    <div className={'admin-left-menu-item-title'}>
                        <ShoppingBagIcon /> Produits
                    </div>
                </Link>
                <Link to={"/admin/categories"}>
                    <div className={'admin-left-menu-item-title'}>
                        <CategoryIcon /> Catégories
                    </div>
                </Link>
                <Link to={"/admin/commandes"}>
                    <div className={'admin-left-menu-item-title'}>
                        <ShoppingCartIcon /> Commandes
                    </div>
                </Link>
                <Link to={"/admin/utilisateurs"}>
                    <div className={'admin-left-menu-item-title'}>
                        <PeopleIcon /> Utilisateurs
                    </div>
                </Link>
                <Link to={"/admin/transporteurs"}>
                    <div className={'admin-left-menu-item-title'}>
                        <LocalShippingIcon /> Transporteurs
                    </div>
                </Link>
                <Link to={"/admin/carousel"}>
                    <div className={'admin-left-menu-item-title'}>
                        <PhotoCamera /> Carousel
                    </div>
                </Link>
                <div className={'admin-left-menu-item-title'} onClick={handleLogout}>
                    <PeopleIcon /> Déconnexion
                </div>
            </div>
        </div>
    )
}