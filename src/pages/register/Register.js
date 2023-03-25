import {useState} from "react";
import "./Register.css";

export default function Register() {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});

    const validateData = () => {
        const validationErrors = {};

        if (name.trim() === '') {
            validationErrors.name = 'Veuillez saisir un nom.';
        }

        if (firstName.trim() === '') {
            validationErrors.firstName = 'Veuillez saisir un prénom.';
        }

        if (email.trim() === '') {
            validationErrors.email = 'Veuillez saisir un email.';
        }

        if (password.trim() === '') {
            validationErrors.password = 'Veuillez saisir un mot de passe.';
        }

        if (passwordConfirm.trim() === '') {
            validationErrors.passwordConfirm = 'Veuillez confirmer votre mot de passe.';
        }

        if (password !== passwordConfirm) {
            validationErrors.passwordConfirm = 'Les mots de passe ne correspondent pas.';
        }

        return validationErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateData();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulaire validé');
        } else {
            setErrors(validationErrors);
        }
    }

    return (
        <div className="register">
            <div className="register-container">
                <h1 className="register-title">Inscription</h1>
                <form>
                    <div className="register-input-container">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" name="nom" id="nom" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div classname="register-error-message-container">
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                    <div className="register-input-container">
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" name="prenom" id="prenom" value={firstName} onChange={e => setFirstName(e.target.value) } />
                    </div>
                    <div classname="register-error-message-container">
                        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                    </div>
                    <div className="register-input-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="register-input-container">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div classname="register-error-message-container">
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                    <div className="register-input-container">
                        <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>
                    <div classname="register-error-message-container">
                        {errors.passwordConfirm && <div className="error-message">{errors.passwordConfirm}</div>}
                    </div>
                    <div className="button-container">
                        <button className="register-button" type="submit" onClick={handleSubmit}>S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    );

}