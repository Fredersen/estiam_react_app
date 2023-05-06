import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import {useParams} from "react-router-dom";
import featuredProductApi from "../../../../services/featuredProductApi";
import {useEffect, useState} from "react";
import productApi from "../../../../services/productApi";
import TableComponent from "../../../../components/admin/table/TableComponent";
import AddIcon from '@mui/icons-material/Add';

export default function AddFeatureProduct() {
    const {id} = useParams();
    const [feature, setFeature] = useState({});
    const [products, setProducts] = useState([]);

    const fetchFeature = async () => {
        const data = await featuredProductApi.find(id);
        setFeature(data);
    }

    const fetchProducts = async () => {
        const data = await productApi.findAll();
        setProducts(data.filter(product => !feature.products.includes(product._id)));
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchFeature();
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        }

        if (Object.keys(feature).length > 0) {
            fetchData();
        }
    }, [feature]);


    const handleAdd = async (productId) => {
        try {
            await featuredProductApi.addProductToFeaturedProduct(id, productId);
            setProducts(products.filter(item => item._id !== productId));
        } catch (error) {
            console.error(error);
        }
    }

    const addAction = {
        label: 'add product',
        icon: <AddIcon />,
        color: 'primary',
        action: handleAdd
    }

    return (
        <AdminLayout>
            <Title title={`Ajout d'un produit : ${feature.name}`} />
            <TableComponent
                items={products}
                columns={['name', 'description', 'price', 'image', 'category']}
                actions={[addAction]}
            />
        </AdminLayout>
    );
}
