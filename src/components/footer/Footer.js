import './Footer.css';

export default function Footer () {
    return (
        <footer className="footer">
            <div className="footer-up">
                <h2>À propos</h2>
                <p>Depuis plus de 37 ans, nous mettons au cœur de notre travail l'amour du bijou et la satisfaction de nos clients.

                    Au-delà d’un bijou, nous vous offrons également un haut niveau de service combiné à une expérience client inégalée.</p>
            </div>
            <div className="footer-down">
                <div className="footer-left">
                    <h2>Liens</h2>
                    <ul>
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#">Boutique</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h2>Contact</h2>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}