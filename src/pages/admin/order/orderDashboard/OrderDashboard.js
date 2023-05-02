import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import orderApi from "services/orderApi";
import TableComponent from "components/admin/table/TableComponent";

export default function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const data = await orderApi.findAll();
        setOrders(data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        try {
            setOrders(orders.filter(order => order._id !== id));
            await orderApi.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/commandes/modification/${id}`);
    }

    const deleteAction = {
        label: 'delete order',
        icon: <DeleteIcon />,
        color: 'error',
        action: handleDelete
    }

    const editAction = {
        label: 'edit order',
        icon: <EditIcon />,
        color: 'primary',
        action: handleEdit
    }

 return(<>
            <Title title="Commandes" />
            <TableComponent items={orders} columns={['_id', 'user', 'carrierName', 'carrierPrice', 'createdAt', 'address', 'state']} actions={[editAction, deleteAction]} />
   </>    );
}