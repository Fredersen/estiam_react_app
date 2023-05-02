import {useNavigate} from "react-router-dom";
import FeaturedProductApi from "services/featuredProductApi";
import AdminLayout from "components/layout/AdminLayout";
import GenericForm from "components/admin/genericForm/GenericForm";
import Title from "components/title/Title";

export default function CreateFeature() {
    const navigate = useNavigate();

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return "Le nom de la mise en avant est requis";
            } else if (value.length < 3) {
                return "Le nom doit comporter au moins 3 caractères";
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await FeaturedProductApi.create(values);
            navigate('/admin/features');
        } catch (error) {
            console.error(error);
        }
    }

 return(<>
            <Title title="Création d'une mise en avant" />
            <GenericForm
                initialValues={{name: ''}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Créer"
            />
      </>
    )
}