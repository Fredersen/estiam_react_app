import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import carrierApi from "../../../../services/carrierApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import CreateButton from "../../../../components/admin/createButton/CreateButton";
import TableComponent from "../../../../components/admin/table/TableComponent";

export default function CarrierDashboard() {
    const [carriers, setCarriers] = useState([]);
    const navigate = useNavigate();

    const fetchCarriers = async () => {
        const data = await carrierApi.findAll();
        setCarriers(data);
    }

    useEffect(() => {
        fetchCarriers();
    }, []);

    const handleDelete = async (id) => {
        try {
            setCarriers(carriers.filter(carrier => carrier._id !== id));
            await carrierApi.delete(id)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/transporteurs/modification/${id}`);
    }

    const deleteAction = {
        label: 'delete category',
        icon: <DeleteIcon />,
        color: 'error',
        action: handleDelete
    }

    const editAction = {
        label: 'edit product',
        icon: <EditIcon />,
        color: 'primary',
        action: handleEdit
    }

    return (
        <AdminLayout>
            <Title title="Transporteurs" />
            <div className="button-container">
                <CreateButton label="Créer un transporteur" link="/admin/transporteurs/ajout" />
            </div>
            <TableComponent items={carriers} columns={['name', 'description', 'price']} actions={[editAction, deleteAction]} />
        </AdminLayout>
    );
}