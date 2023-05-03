import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import featuredProductApi from "../../../../services/featuredProductApi";
import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import GenericForm from "../../../../components/admin/genericForm/GenericForm";
import productApi from "../../../../services/productApi";
import DeleteIcon from '@mui/icons-material/Delete';
import TableComponent from "../../../../components/admin/table/TableComponent";
import {Button} from "@mui/material";
import './EditFeature.css';

export default function EditFeature() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [feature, setFeature] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchFeature = async () => {
            const data = await featuredProductApi.find(id);
            const productsPromises = data.products.map(product => productApi.find(product));
            const products = await Promise.all(productsPromises);
            setFeature(data);
            setProducts(products);
        };
        fetchFeature();
    }, [id]);

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return 'Le nom de la mise en avant est requis';
            } else if (value.length < 3) {
                return 'Le nom doit comporter au moins 3 caractères';
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await featuredProductApi.update(id, values);
            navigate('/admin/features');
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (productId) => {
        try {
            await featuredProductApi.deleteProductFromFeaturedProduct(id, productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error(error);
        }
    }

    const deleteAction = {
        label: 'delete product',
        icon: <DeleteIcon />,
        color: 'error',
        action: handleDelete
    }

    return (
        <AdminLayout>
            <Title title="Modification d'une mise en avant" />
            <Link to={`/admin/features/${id}/add-product`}>
                <Button variant="contained" color="primary" className="edit-feature-add-product-button">Ajouter des produits</Button>
            </Link>
            <GenericForm
                initialValues={{ name: feature.name }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
            {products.length > 0 && (
                <TableComponent
                    items={products}
                    columns={['name', 'description', 'price', 'image', 'category']}
                    actions={[deleteAction]}
                />
            )}
        </AdminLayout>

    )
}