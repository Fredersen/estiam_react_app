import AdminLayout from "../../../../components/layout/AdminLayout";
import Title from "../../../../components/title/Title";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import userApi from "../../../../services/userApi";
import GenericForm from "../../../../components/admin/genericForm/GenericForm";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userApi.find(id);
            setUser(user);
        };
        fetchUser();
    }, []);

    const validationSchema = {
        firstname: (value) => {
            if (!value) {
                return 'Le prénom est requis';
            } else if (value.length < 3) {
                return 'Le prénom doit comporter au moins 3 caractères';
            } else {
                return null;
            }
        },
        lastname: (value) => {
            if (!value) {
                return 'Le nom est requis';
            } else if (value.length < 3) {
                return 'Le nom doit comporter au moins 3 caractères';
            } else {
                return null;
            }
        },
        email: (value) => {
            if (!value) {
                return 'L\'email est requis';
            } else if (!value.includes('@')) {
                return 'L\'email doit comporter un @';
            } else {
                return null;
            }
        },
        password: (value) => {
            if (!value) {
                return 'Le mot de passe est requis';
            } else if (value.length < 6) {
                return 'Le mot de passe doit comporter au moins 6 caractères';
            } else {
                return null;
            }
        },
        role: (value) => {
            if (!value) {
                return 'Le rôle est requis';
            } else {
                return null;
            }
        }
    }

    const onSubmit = async (values) => {
        try {
            await userApi.update(id, values);
            navigate('/admin/utilisateurs');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AdminLayout>
            <Title title="Modification d'un utilisateur" />
            <GenericForm
                initialValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                submitLabel="Modifier"
            />
        </AdminLayout>
    );
}