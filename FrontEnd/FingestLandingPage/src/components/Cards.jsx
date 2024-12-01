import '../../public/css/Cards.css'

function Cards({ title, content }) {
    return (
        <div className="Card"> {/* Cambiado a className */}
            <h1 className="CardTitle">{title}</h1> {/* Cambiado a className */}
            <p className="CardContent"  style={{display: 'none'}}>{content}</p> {/* Cambiado a className */}
        </div>
    );
}


export default Cards;
