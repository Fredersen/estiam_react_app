import React, { useState } from 'react';
import './Login.css';
import authApi from "../../services/authApi";

export default function Login({setShowRegister, toggleLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authApi.authenticate({
                email,
                password
            });

            if(authApi.isAuthenticated()) {
                toggleLogin();
            }

        } catch (error) {
            setError('Email ou mot de passe incorrect');
        }
        setLoading(false);
    };

    const handleRegister = () => {
        setShowRegister(true);
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        Se connecter
                    </button>
                </form>
                {error && <p>{error}</p>}
                <span className="separator"/>
                <div className="create-account-btn" onClick={handleRegister}>
                    Créer votre compte
                </div>
            </div>
        </div>
    );
}