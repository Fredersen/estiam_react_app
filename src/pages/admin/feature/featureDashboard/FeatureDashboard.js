import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import CreateButton from "components/admin/createButton/CreateButton";
import TableComponent from "components/admin/table/TableComponent";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import featuredProductApi from "services/featuredProductApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function FeatureDashboard() {
    const [features, setFeatures] = useState([]);
    const navigate = useNavigate();

    const fetchFeatures = async () => {
        const data = await featuredProductApi.findAll();
        setFeatures(data);
    }

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleDelete = async (id) => {
        try {
            setFeatures(features.filter(feature => feature._id !== id));
            await featuredProductApi.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/features/modification/${id}`);
    }

    const deleteAction = {
        label: 'delete feature',
        icon: <DeleteIcon />,
        color: 'error',
        action: handleDelete
    }

    const editAction = {
        label: 'edit feature',
        icon: <EditIcon />,
        color: 'primary',
        action: handleEdit
    }

 return(<>
            <Title title="Mises en avant" />
            <div className="button-container">
                <CreateButton label="Créer une mise en avant" link="/admin/features/ajout" />
            </div>
            <TableComponent items={features} columns={['_id', 'name']} actions={[editAction, deleteAction]} />
            </>
    )
}