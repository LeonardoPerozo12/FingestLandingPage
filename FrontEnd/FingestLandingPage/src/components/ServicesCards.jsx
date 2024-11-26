import React from 'react';
import '../../public/css/Cards.css'

function Cards({ title, content }) { // Desestructurando las props
    return (
        <div id="Card">
            <h1 id="CardTitle">{title}</h1>
            <p id="CardContent">{content}</p>
        </div>
    );
}


export default Cards;
