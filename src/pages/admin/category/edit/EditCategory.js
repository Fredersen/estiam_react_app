import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import categoryApi from "services/categoryApi";
import GenericForm from "components/admin/genericForm/GenericForm";
import Title from "components/title/Title";
import AdminLayout from "components/layout/AdminLayout";

export default function EditCategory() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await categoryApi.find(id);
            setCategory(data);
        }
        fetchCategory();
    }, [id]);

    const validationSchema = {
        name: (value) => {
            if (!value) {
                return 'Le nom de la catégorie est requis';
            } else if (value.length < 3) {
                return 'Le nom doit comporter au moins 3 caractères';
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await categoryApi.update(id, values);
            navigate('/admin/categories');
        } catch (error) {
            console.error(error);
        }
    }

 return(<>
            <Title title="Modification d'une catégorie" />
            <GenericForm
                initialValues={{name: category.name}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
   </>
    )
}