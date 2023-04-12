import './ProductDashboard.css';
import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../../../services/productApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableComponent from "../../../../components/admin/table/TableComponent";
import categoryApi from "../../../../services/categoryApi";
import CreateButton from "../../../../components/admin/createButton/CreateButton";

export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const products = await productApi.findAll();
        setProducts(products);
    }
    const fetchCategories = async () => {
        const categories = await categoryApi.findAll();
        setCategories(categories);
    }

    const prepareProducts = () => {
        return products.map(product => ({
            ...product,
            category: categories.find(category => category._id === product.category).name,
        }));
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();

    }, []);


    useEffect(() => {
        setProducts(prepareProducts());
    }, [categories]);


    const handleDelete = async (id) => {
        console.log(id)
        try {
            await productApi.delete(id);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/produits/modification/${id}`);
    };

    const deleteAction = {
        label: 'delete product',
        icon: <DeleteIcon />,
        color: 'secondary',
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
            <Title title="Produits" />
            <div className="button-container">
                <CreateButton label="Créer un produit" link="/admin/produits/ajout" />
            </div>
            <TableComponent items={products} columns={['name', 'description', 'price', 'image', 'category']} actions={[deleteAction, editAction]} />
        </AdminLayout>
    )
}
