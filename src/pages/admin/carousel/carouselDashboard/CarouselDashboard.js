import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import carouselApi from "../../../../services/carouselApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateButton from "../../../../components/admin/createButton/CreateButton";
import TableComponent from "../../../../components/admin/table/TableComponent";


export default function CarouselDashboard() {
    const [carousels, setCarousels] = useState([]);
    const navigate = useNavigate();

    const fetchCarousels = async () => {
        const data = await carouselApi.findAll();
        setCarousels(data);
    }

    useEffect(() => {
        fetchCarousels();
    }, []);

    const handleDelete = async (id) => {
        try {
            await carouselApi.delete(id);
            setCarousels(carousels.filter(carousel => carousel._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/carousel/modification/${id}`);
    }

    const deleteAction = {
        label: 'delete product',
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
            <Title title="Carousel" />
            <div className="button-container">
                <CreateButton label="Ajouter une image au carousel" link="/admin/carousel/ajout" />
            </div>
            <TableComponent items={carousels} columns={['_id', 'image']} actions={[deleteAction, editAction]} />
        </AdminLayout>
    );
}