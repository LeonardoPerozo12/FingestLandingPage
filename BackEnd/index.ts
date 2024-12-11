import express, {Express, Request, Response} from "express";
const port = 8000;

const app = express();

app.get('/', (req, res) =>{

    res.send('Testing Api');
});

app.get('/Calendar', (req, res)=>{

    res.send(
        'Enero Febrero Marzo...');
});


app.listen(port, () =>{
    console.log(`now listening on port http://localhost:${port}`);
});