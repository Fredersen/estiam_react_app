import React, { useState } from 'react';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'naim.jhuboo@gmail.com' && password === 'password') {
                    resolve();
                }
                else {
                    reject(new Error('Email ou mot de passe incorrect'));
                }
            }, 1000);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            localStorage.setItem('ROLE', 'USER');
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

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
            </div>
        </div>
    );
}