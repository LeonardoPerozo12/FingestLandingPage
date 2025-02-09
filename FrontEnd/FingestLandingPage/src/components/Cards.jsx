import '../../css/Cards.css'

function Cards({ title, content }) {
    return (
        <div className="DisplayCard">
            <h1 className="CardTitle">{title}</h1>
            <p className="CardContent"  style={{display: 'none'}}>{content}</p>
        </div>
    );
}


export default Cards;
