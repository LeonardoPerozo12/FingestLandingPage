import express, {Express, Request, Response} from "express";
const port = 8000;

const app = express();

app.get('/', (req, res) =>{

    res.send('Hello World!, Express, TS and Nodemon');
});

app.listen(port, () =>{
    console.log(`now listening on port http://localhost:${port}`);
});