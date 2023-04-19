import carouselApi from "../../../../services/carouselApi";
import AdminLayout from "../../../../components/layout/AdminLayout";
import GenericForm from "../../../../components/admin/genericForm/GenericForm";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Title from "../../../../components/title/Title";

export default function EditCarousel() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [carousel, setCarousel] = useState({});

    const fetchCarousel = async () => {
        try {
            const data = await carouselApi.findOne(id);
            setCarousel(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCarousel().catch(error => console.error(error));
    }, []);

    const initialValues = {
        image: carousel.image
    }

    const validationSchema = {
        image: (value) => {
            if (!value) {
                return "L'image est requise";
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await carouselApi.update(id, values);
            navigate('/admin/carousel');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminLayout>
            <Title title="Modifier une image du carousel" />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
        </AdminLayout>
    );
}