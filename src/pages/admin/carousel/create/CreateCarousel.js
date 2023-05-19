import {useNavigate} from "react-router-dom";
import carouselApi from "services/carouselApi";
import Title from "components/title/Title";
import GenericForm from "components/admin/genericForm/GenericForm";
import imageApi from "services/imageApi";


export default function CreateCarousel() {
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
            formData.append('image', values.image);

            const imageResponse = await imageApi.upload(formData);

            if (!imageResponse.success) {
                throw new Error('Image upload failed');
            }

            const carouselData = {
                image: imageResponse.url,
            };

            await carouselApi.create(carouselData);
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