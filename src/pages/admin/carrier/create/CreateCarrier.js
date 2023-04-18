import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import carrierApi from "../../../../services/carrierApi";
import GenericForm from "../../../../components/admin/genericForm/GenericForm";

export default function CreateCarrier() {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        description: "",
        price: ""
    };

    const validateSchema = {
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
        }
    }

    const onSubmit = async (values) => {
        try {
            await carrierApi.create(values);
            return navigate('/admin/transporteurs');
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <AdminLayout>
            <Title title="Création d'un transporteur" />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={onSubmit}
                submitLabel="Créer"
            />
        </AdminLayout>
    )
}