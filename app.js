import express from 'express';
import templateHomePage from './views/index.js';
import templateStudentPage from './views/student.js';
import templateAdminPage from './views/admin.js';
import templateTeacherPage from './views/teacher.js';
import templateStudentList from './views/student list/student-list.js';
import { convertStudentExcelFileToMap } from './control/excel-to-map.js';
import templateTeacherList from './views/teacher list/teacher-list.js';
import { convertTeacherExcelToMap } from './control/excel-to-map.js';

const app = express();
const port = 80;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//ROUTES
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

app.get('/admin', (req, res) => {
    const fragment = templateAdminPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//STUDENT ROUTES


//TEACHER ROUTES


//ADMIN ROUTES
app.post('/student-list/search', (req, res) => {
    const unfilteredMap = convertStudentExcelFileToMap();
    const searchText = req.body.search.toUpperCase();

    const filteredMap = new Map(
        Array.from(unfilteredMap).filter(([key, value]) => 
            value.nombre.toUpperCase().includes(searchText)
        ).map(([key, value]) => [
            key, 
            {
                nombre: value.nombre.toUpperCase(),
                apellidoPaterno: value.apellidoPaterno.toUpperCase(),
                apellidoMaterno: value.apellidoMaterno.toUpperCase()
            }
        ])
    );

    const fragment = templateStudentList(filteredMap);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/student-list', (req, res) => {
    const map = convertStudentExcelFileToMap();
    const fragment = templateStudentList(map);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/teacher-list', (req, res) => {
    const map = convertTeacherExcelToMap();
    const fragment = templateTeacherList(map);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//PORT
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});