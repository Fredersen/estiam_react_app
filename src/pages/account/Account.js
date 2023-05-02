import { useEffect, useState } from "react";
import userApi from "services/userApi";
import authApi from "services/authApi";
import Title from "components/title/Title";
import './Account.css';

export default function Account() {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedUser = await userApi.find(authApi.retrieveUserId());
                setUser(loggedUser);
                setFormData(loggedUser);
            } catch (e) {
                console.log(e);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userApi.update(authApi.retrieveUserId(), formData);
            setUser(formData);
            setEditMode(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container account">
            <Title title={"Mon compte"} />
            <div className="account-container">
                    {editMode ? (
                        <form onSubmit={handleSubmit} className="account-form">
                            <div className="account-input">
                                <label htmlFor="firstname">Prénom</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="lastname">Nom</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="account-button-edit">Mettre à jour</button>
                            <button type="button" onClick={() => setEditMode(false)} className="account-button-cancel">
                                Annuler
                            </button>
                        </form>
                    ) : (
                        <div className="account-form">
                            <div className="account-input">
                                <label htmlFor="firstname">Prénom</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={user.firstname}
                                    disabled
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="lastname">Nom</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={user.lastname}
                                    disabled
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    disabled
                                />
                            </div>
                            <button onClick={() => setEditMode(true)} className="account-button">Éditer</button>
                        </div>
                    )}
                </div>
        </div>
    );

}
