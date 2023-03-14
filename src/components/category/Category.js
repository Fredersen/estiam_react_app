import './Category.css';

export default function Category ({ title, slug }) {
    return (
        <div className="category">
            <a href={slug}> { title } </a>
        </div>
    );
}