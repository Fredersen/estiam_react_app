import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import orderApi from "services/orderApi";
import GenericForm from "components/admin/genericForm/GenericForm";

export default function EditOrder() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            const order = await orderApi.find(id);
            setOrder(order);
        };
        fetchOrder();
    }, []);

    const validationSchema = {
        state: (value) => {
            if (!value) {
                return 'Le statut est requis';
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await orderApi.update(id, values);
            navigate('/admin/commandes');
        } catch (error) {
            console.error(error);
        }
    }

 return(<>
            <Title title="Modification d'une commande" />
            <GenericForm initialValues={{
                state: order.state
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitLabel="Modifier"
            />
   </>    );
}