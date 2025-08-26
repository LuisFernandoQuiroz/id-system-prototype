import express from 'express';
import templateHomePage from './views/index.js';
import templateStudentPage from './views/student.js';
import templateAdminPage from './views/admin.js';
import templateTeacherPage from './views/teacher.js';
import { readStudentTable } from './control/pdf-array.js';

const app = express();
const port = 80;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//routes
app.get('', (req, res) => {
    res.send(templateHomePage());
});

app.get('/student', (req, res) => {
    const fragment = templateStudentPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/teacher', (req, res) => {
    const fragment = templateTeacherPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get("/read-excel", (req, res) => {
    const data = readStudentTable();
    res.json(data);
});

app.get('/admin', (req, res) => {
    const fragment = templateAdminPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});