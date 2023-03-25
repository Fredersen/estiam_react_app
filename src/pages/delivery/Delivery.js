import './Delivery.css';
import Title from "../../components/title/Title";
import { MdDone } from 'react-icons/md';
import {useState} from "react";

export default function Delivery () {
    const deliveryData = [{id: 1, name: "Colissimo", price: 5.00, description: "Livraison en 48h"},
        {id: 2, name: "Chronopost", price: 10.00, description: "Livraison en 24h"},
        {id: 3, name: "TNT", price: 15.00, description: "Livraison en 24h"}];
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [additionnalInfo, setAdditionnalInfo] = useState("");
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [civility, setCivility] = useState("Mme");

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateData();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Formulaire validé")
        } else {
            setErrors(validationErrors);
        }
    }

    const validateData = () => {
        const validationErrors = {};

        if (!selectedDelivery) {
            validationErrors.delivery = "Veuillez sélectionner un mode de livraison.";
        }

        if (!civility) {
            validationErrors.civility = "Veuillez sélectionner une civilité.";
        }

        if (name.trim() === "") {
            validationErrors.name = "Veuillez saisir un nom.";
        }

        if (firstName.trim() === "") {
            validationErrors.firstName = "Veuillez saisir un prénom.";
        }

        if (address.trim() === "") {
            validationErrors.address = "Veuillez saisir une adresse.";
        }

        if (city.trim() === "") {
            validationErrors.city = "Veuillez saisir une ville.";
        }

        if (postalCode.trim() === "") {
            validationErrors.postalCode = "Veuillez saisir un code postal.";
        } else if (!/^\d{5}$/.test(postalCode)) {
            validationErrors.postalCode = "Le code postal doit être composé de 5 chiffres.";
        }

        if (phone.trim() === "") {
            validationErrors.phone = "Veuillez saisir un numéro de téléphone.";
        } else if (!/^(\+\d{1,2})?\d{10}$/.test(phone)) {
            validationErrors.phone = "Le numéro de téléphone doit être composé de 10 chiffres (avec éventuellement un préfixe international).";
        }

        if (email.trim() === "") {
            validationErrors.email = "Veuillez saisir une adresse e-mail.";
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            validationErrors.email = "Veuillez saisir une adresse e-mail valide.";
        }

        return validationErrors;
    };

    console.log(selectedDelivery);

    return (
        <div className="delivery">
            <Title title="Choisir mon mode de livraison" />
            <div className="delivery-content">
                {deliveryData.map((delivery) => (
                    <div className="delivery-card" key={delivery.id}>
                        <input type="radio" name="delivery" id={delivery.id} value={delivery.id} checked={selectedDelivery === delivery.id} onChange={e => setSelectedDelivery(delivery.id)} />
                        <label htmlFor={delivery.id}>
                            <div className="delivery-card-title">{delivery.name}</div>
                            <div className="delivery-card-description">{delivery.description}</div>
                            <div className="delivery-card-price">{delivery.price} €</div>
                            <MdDone className="validation-icon" />
                        </label>
                    </div>
                ))}
            </div>
            {errors.delivery && (
                <div className="error-message">{errors.delivery}</div>
            )}
            <Title title="Adresse de livraison" />
            <div className="delivery-address">
                {/* Civilité */}
                <div className="delivery-address-input">
                    <label htmlFor="civilite">Civilité</label>
                    <select name="civilite" id="civilite" value={civility} onChange={e=>setCivility(e.target.value)}>
                        <option value="Mme">Mme</option>
                        <option value="M">M</option>
                    </select>
                </div>
                {errors.civility && (
                    <div className="error-message">{errors.civility}</div>
                )}

                {/* Nom et Prénom */}
                <div className="delivery-address-input-container">
                    <div className="delivery-address-input-split">
                        <div className="delivery-address-input">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" name="nom" id="nom" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="delivery-address-input">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" name="prenom" id="prenom" value={firstName} onChange={e => setFirstName(e.target.value) } />
                        </div>
                    </div>
                    <div className="error-message-container">
                        {errors.name && (
                            <div className="error-message">{errors.name}</div>
                        )}
                        {errors.firstName && (
                            <div className="error-message">{errors.firstName}</div>
                        )}
                    </div>
                </div>

                {/* Email et Téléphone */}
                <div className="delivery-address-input-container">
                    <div className="delivery-address-input-split">
                        <div className="delivery-address-input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="delivery-address-input">
                            <label htmlFor="telephone">Téléphone</label>
                            <input type="text" name="telephone" id="telephone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="error-message-container">
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                        {errors.phone && (
                            <div className="error-message">{errors.phone}</div>
                        )}
                    </div>
                </div>

                {/* Code postal et Ville */}
                <div className="delivery-address-input-container">
                    <div className="delivery-address-input-split">
                        <div className="delivery-address-input">
                            <label htmlFor="codePostal">Code postal</label>
                            <input type="text" name="codePostal" id="codePostal" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                        </div>
                        <div className="delivery-address-input">
                            <label htmlFor="ville">Ville</label>
                            <input type="text" name="ville" id="ville" value={city} onChange={e =>setCity(e.target.value)} />
                        </div>
                    </div>
                    <div className="error-message-container">
                        {errors.postalCode && (
                            <div className="error-message">{errors.postalCode}</div>
                        )}
                        {errors.city && (
                            <div className="error-message">{errors.city}</div>
                        )}
                    </div>
                </div>

                {/* Adresse */}
                <div className="delivery-address-input-container">
                    <div className="delivery-address-input">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" name="adresse" id="adresse" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    {errors.address && (
                        <div className="error-message">{errors.address}</div>
                    )}
                </div>

                {/* Complément d'adresse */}
                <div className="delivery-address-input">
                    <label htmlFor="complement">Complément d'adresse</label>
                    <input type="text" name="complement" id="complement" value={additionnalInfo} onChange={e => setAdditionnalInfo(e.target.value)}/>
                </div>

            </div>
            <button className="delivery-button" onClick={handleSubmit}>Valider</button>
        </div>
    );
}