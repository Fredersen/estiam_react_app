import './SubMenu.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import orderApi from "services/orderApi";
import authApi from "services/authApi";

export default function SubMenu({ setShowSubMenu }) {
    const [showOrder, setShowOrder] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(); // Ajout du useRef

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await orderApi.findByUserId(authApi.retrieveUserId());
                orders.length > 0 && setShowOrder(true);
            }
            catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { // Ajout d'un nouvel effet
        const handleDocumentClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowSubMenu(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    const handleLogout = () => {
        authApi.logout();
        setShowSubMenu(false);
        navigate('/');
    };

    const handleClick = () => {
        setShowSubMenu(false);
    };

    return (
        <div className="sub-menu" ref={menuRef}> {/* Ajout de la référence */}
            <div className="sub-menu-container">
                <div className="sub-menu-item" onClick={handleClick}>
                    <Link to={'/mon-compte'}>
                        <div className="sub-menu-item-title">Mon compte</div>
                    </Link>
                </div>
                {showOrder && (
                    <div className="sub-menu-item" onClick={handleClick}>
                        <Link to={'/mes-commandes'}>
                            <div className="sub-menu-item-title">Mes commandes</div>
                        </Link>
                    </div>
                )}
                <div className="sub-menu-item" onClick={handleLogout}>
                    <div className="sub-menu-item-title">Déconnexion</div>
                </div>
            </div>
        </div>
    );
}

