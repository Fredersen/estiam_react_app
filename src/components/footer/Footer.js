import './Footer.css';

export default function Footer () {
    return (
        <footer className="footer">
            <div className="footer-up">
                <h2>À propos</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem.</p>
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