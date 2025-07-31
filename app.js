import express from 'express';
import templateHomePage from './views/index.js';

const app = express();
const port = 5000;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('', (req, res) => {
    res.send(templateHomePage());
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});