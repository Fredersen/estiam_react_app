import { useEffect, useState } from "react";
import categoryApi from "services/categoryApi";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import CreateButton from "components/admin/createButton/CreateButton";
import TableComponent from "components/admin/table/TableComponent";

export default function CategoryDashboard() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategory = async () => {
        const data = await categoryApi.findAll();
        setCategories(data);
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDelete = async (id) => {
        try {
            setCategories(categories.filter(category => category._id !== id));
            await categoryApi.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/categories/modification/${id}`);
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

    return (<>
        <Title title="Catégories" />
        <div className="button-container">
            <CreateButton label="Créer une catégorie" link="/admin/categories/ajout" />
        </div>
        <TableComponent items={categories} columns={['_id', 'name']} actions={[editAction, deleteAction]} />
    </>
    )
}