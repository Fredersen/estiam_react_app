import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import GenericForm from "components/admin/genericForm/GenericForm";
import productApi from "services/productApi";
import categoryApi from "services/categoryApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

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

    const initialValues = {
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
    };

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return "Le nom du produit est requis";
            } else if (value.length < 3) {
                return "Le nom doit comporter au moins 3 caractères";
            } else {
                return null;
            }
        },
        description: (value) => {
            if (!value) {
                return "La description du produit est requise";
            } else if (value.length < 10) {
                return "La description doit comporter au moins 10 caractères";
            } else {
                return null;
            }
        },
        price: (value) => {
            if (!value) {
                return "Le prix du produit est requis";
            } else if (value < 0) {
                return "Le prix doit être supérieur ou égal à 0";
            } else {
                return null;
            }
        },
        image: (value) => {
            if (!value) {
                return "L'image du produit est requise";
            } else {
                return null;
            }
        },
        category: (value) => {
            if (!value) {
                return "La catégorie du produit est requise";
            } else {
                return null;
            }
        },
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("category", values.category);
            formData.append("image", values.image);
            await productApi.create(formData);
            return navigate("/admin/produits");
        } catch (error) {
            console.error(error);
        }
    };

 return(<>
            <Title title="Création de produit" />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                fetchOptions={categories}
                submitLabel="Créer"
            />
   </>    );
}
