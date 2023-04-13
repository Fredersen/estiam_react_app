import {useNavigate} from "react-router-dom";
import CategoryApi from "../../../../services/categoryApi";
import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import GenericForm from "../../../../components/admin/genericForm/GenericForm";

export default function CreateCategory() {
    const navigate = useNavigate();

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return "Le nom de la catégorie est requis";
            } else if (value.length < 3) {
                return "Le nom doit comporter au moins 3 caractères";
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await CategoryApi.create(values);
            navigate('/admin/categories');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminLayout>
            <Title title="Création d'une catégorie" />
            <GenericForm
                initialValues={{name: ''}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Créer"
            />
        </AdminLayout>
    )
}
