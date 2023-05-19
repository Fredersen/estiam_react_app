import Title from "components/title/Title";
import GenericForm from "components/admin/genericForm/GenericForm";
import productApi from "services/productApi";
import categoryApi from "services/categoryApi";
import imageApi from "services/imageApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await categoryApi.findAll();
            setCategories(
                categories.map((category) => ({
                    label: category.name,
                    value: category._id,
                }))
            );
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await productApi.find(id);
            setProduct(product);
        };
        fetchProduct();
    }, [id, categories]);

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return 'Le nom du produit est requis';
            } else if (value.length < 3) {
                return 'Le nom doit comporter au moins 3 caractères';
            } else {
                return null;
            }
        },
        description: (value) => {
            if (!value) {
                return 'La description du produit est requise';
            } else if (value.length < 10) {
                return 'La description doit comporter au moins 10 caractères';
            } else {
                return null;
            }
        },
        price: (value) => {
            if (!value) {
                return 'Le prix du produit est requis';
            } else if (value < 0) {
                return 'Le prix doit être supérieur ou égal à 0';
            } else {
                return null;
            }
        },
        image: (value) => {
            if (!value) {
                return 'L\'image du produit est requise';
            }
        },
        category: (value) => {
            if (!value) {
                return 'La catégorie du produit est requise';
            } else {
                return null;
            }
        },
    };

    const onSubmit = async (values) => {
        try {
            if (values.image instanceof File) {
                const formData = new FormData();
                formData.append('image', values.image);

                const imageResponse = await imageApi.upload(formData);

                if (!imageResponse.success) {
                    throw new Error('Image upload failed');
                }

                values.image = imageResponse.url;
            }
            await productApi.update(id, values);
            navigate('/admin/produits');
        } catch (error) {
            console.error(error);
        }
    };

 return(<>
            <Title title="Modifier un produit" />
            <GenericForm
                initialValues={{
                    name: product.name || "",
                    description: product.description || "",
                    price: product.price || "",
                    image: product.image || "",
                    category: product.category || "",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                fetchOptions={categories}
                submitLabel="Modifier"
            />
   </>    );
}
