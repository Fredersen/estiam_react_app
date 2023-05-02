import AdminLayout from "components/layout/AdminLayout";
import Title from "components/title/Title";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import userApi from "services/userApi";
import TableComponent from "components/admin/table/TableComponent";

export default function UserDashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const data = await userApi.findAll();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            setUsers(users.filter(user => user._id !== id));
            await userApi.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/utilisateurs/modification/${id}`);
    }

    const deleteAction = {
        label: 'delete user',
        icon: <DeleteIcon />,
        color: 'error',
        action: handleDelete
    }

    const editAction = {
        label: 'edit user',
        icon: <EditIcon />,
        color: 'primary',
        action: handleEdit
    }

 return(<>
            <Title title="Utilisateurs" />
            <TableComponent items={users} columns={['firstname', 'lastname', 'email', 'role']} actions={[editAction, deleteAction]} />
   </>    );
}