import carouselApi from "services/carouselApi";
import GenericForm from "components/admin/genericForm/GenericForm";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Title from "components/title/Title";
import imageApi from "services/imageApi";

export default function EditCarousel() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [carousel, setCarousel] = useState({});

    const fetchCarousel = async () => {
        try {
            const data = await carouselApi.find(id);
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
            if (values.image instanceof File) {
                const formData = new FormData();
                formData.append('image', values.image);

                const imageResponse = await imageApi.upload(formData);

                if (!imageResponse.success) {
                    throw new Error('Image upload failed');
                }

                values.image = imageResponse.url;
            }

            await carouselApi.update(id, values);
            navigate('/admin/carousel');
        } catch (error) {
            console.error(error);
        }
    };


    return(<>
            <Title title="Modifier une image du carousel" />
            <GenericForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
   </>    );
}