import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import featuredProductApi from "services/featuredProductApi";
import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import GenericForm from "components/admin/genericForm/GenericForm";

export default function EditFeature() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [feature, setFeature] = useState({});

    useEffect(() => {
        const fetchFeature = async () => {
            const data = await featuredProductApi.find(id);
            setFeature(data);
        }
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

 return(<>
            <Title title="Modification d'une mise en avant" />
            <GenericForm
                initialValues={{name: feature.name}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
      </>
    )
}