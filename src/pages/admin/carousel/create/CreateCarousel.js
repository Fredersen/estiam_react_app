import {useState} from "react";
import {useNavigate} from "react-router-dom";
import carouselApi from "services/carouselApi";
import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import GenericForm from "components/admin/genericForm/GenericForm";

export default function CreateCarousel() {
    const [carousel, setCarousel] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        image: ""
    };

    const validationSchema = {
        image: (value) => {
            if (!value) {
                return "L'image est requise";
            } else {
                return null;
            }
        }
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("image", values.image);
            await carouselApi.create(formData);
            navigate('/admin/carousel');
        } catch (error) {
            console.error(error);
        }
    }

 return(<>
            <Title title="Ajouter une image au carousel" />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Créer"
            />
   </>    );
}